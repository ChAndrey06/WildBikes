using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;
using WildBikesApi.Configuration;
using WildBikesApi.DTO.Booking;
using WildBikesApi.DTO.Mail;
using WildBikesApi.Services.BookingService;
using WildBikesApi.Services.MailService;
using WildBikesApi.Services.PdfGeneratorService;
using WildBikesApi.Services.ResourcesService;
using WildBikesApi.Services.ViewRendererService;

namespace WildBikesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class BookingsController : ControllerBase
    {

        private readonly IBookingsService _bookingsService;
        private readonly IResourcesService _resourcesService;
        private readonly IPdfGeneratorService _pdfService;
        private readonly IMailService _mailService;
        private readonly IViewRendererService _viewRendererService;
        private readonly ResourcesNames _resourcesNames;

        public BookingsController(
            IBookingsService bookingService,
            IPdfGeneratorService pdfService,
            IMailService mailService,
            IResourcesService resourcesService,
            IViewRendererService viewRendererService,
            IOptions<ResourcesNames> resourcesNames
        )
        {
            _bookingsService = bookingService;
            _pdfService = pdfService;
            _mailService = mailService;
            _resourcesService = resourcesService;
            _viewRendererService = viewRendererService;
            _resourcesNames = resourcesNames.Value;
        }

        [HttpGet]
        public async Task<ActionResult<List<BookingReadDTO>>> GetAll()
        {
            return Ok(await _bookingsService.GetAll());
        }

        [HttpGet("{uuid}")]
        public async Task<ActionResult<BookingReadDTO>> GetByUuid(string uuid)
        {
            var bookingReadDTO = await _bookingsService.GetByUuid(uuid);
            return bookingReadDTO is null ? NotFound() : Ok(bookingReadDTO);
        }

        [HttpPut("{uuid}")]
        public async Task<ActionResult<BookingReadDTO>> Update(string uuid, BookingCreateDTO bookingCreateDTO)
        {
            var bookingReadDTO = await _bookingsService.Update(uuid, bookingCreateDTO);
            return bookingReadDTO is null ? NotFound() : Ok(bookingReadDTO);
        }

        [HttpPost]
        public async Task<ActionResult<BookingReadDTO>> Create(BookingCreateDTO bookingCreateDTO)
        {
            return Ok(await _bookingsService.Create(bookingCreateDTO));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            await _bookingsService.DeleteAll();
            return Ok();
        }

        [HttpPost("{uuid}/Sign"), AllowAnonymous]
        public async Task<ActionResult> Sign(string uuid, BookingSignatureDTO bookingSignatureDTO)
        {
            var bookingReadDTO = await _bookingsService.Sign(uuid, bookingSignatureDTO);

            if (bookingReadDTO is null) return NotFound();

            string html = await getDocumentHtml(bookingReadDTO);
            byte[] bytes = _pdfService.HtmlToPdf(html);
            string fileName = getValidFilename(_bookingsService.FormatString(_bookingsService.GetSignDocumentName(), bookingReadDTO));

            var mail = new MailSendDTO()
            {
                MailTo = bookingSignatureDTO.Email,
                Subject = _bookingsService.FormatString(_bookingsService.GetSignMailSubject(), bookingReadDTO),
                Body = _bookingsService.FormatString(_bookingsService.GetSignMailBody(), bookingReadDTO),

                File = new FileDTO()
                {
                    FileName = fileName,
                    Bytes = bytes,
                    ContentType = _pdfService.GetPdfContentType()
                }
            };

            await _mailService.SendEmailAsync(mail);

            return Ok();
        }

        [HttpGet("{uuid}/Document"), AllowAnonymous]
        public async Task<ActionResult<object>> Document(string uuid)
        {
            var bookingReadDTO = await _bookingsService.GetByUuid(uuid);

            if (bookingReadDTO is null)
            {
                return NotFound();
            }

            string document = await getDocumentHtml(bookingReadDTO);

            return Ok(new
            {
                document,
                isSigned = !bookingReadDTO.Signature.IsNullOrEmpty()
            });
        }

        [HttpGet("{uuid}/Download")]
        public async Task<ActionResult> Download(string uuid)
        {
            var bookingReadDTO = await _bookingsService.GetByUuid(uuid);

            if (bookingReadDTO is null)
            {
                return NotFound();
            }

            string html = await getDocumentHtml(bookingReadDTO);
            byte[] bytes = _pdfService.HtmlToPdf(html);
            string fileName = getValidFilename(_bookingsService.FormatString(_bookingsService.GetSignDocumentName(), bookingReadDTO));

            return File(bytes, _pdfService.GetPdfContentType(), fileName);
        }

        private async Task<string> getDocumentHtml(BookingReadDTO bookingReadDTO)
        {
            string html, content;

            if (!_viewRendererService.TemplateExist(_resourcesNames.DocumentTemplate))
            {
                content = await _resourcesService.GetValueByName(_resourcesNames.DocumentTemplate);
                await _viewRendererService.AddOrUpdateTemplate(_resourcesNames.DocumentTemplate, content);
            }

            html = await _viewRendererService.Render(_resourcesNames.DocumentTemplate, bookingReadDTO);

            return html;
        }

        private string getValidFilename(string filename)
        {
            string regSearch = new string(Path.GetInvalidFileNameChars());
            var rg = new Regex(string.Format("[{0}]", Regex.Escape(regSearch)));

            return rg.Replace(filename, "");
        }
    }
}
