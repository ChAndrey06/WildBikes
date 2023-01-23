using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Razor.Templating.Core;
using System.Text.RegularExpressions;
using WildBikesApi.DTO.Booking;
using WildBikesApi.DTO.Mail;
using WildBikesApi.Services.BookingService;
using WildBikesApi.Services.MailService;
using WildBikesApi.Services.PdfGeneratorService;

namespace WildBikesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private const string documentViewPath = "~/Views/Booking/Document.cshtml";

        private readonly IBookingService _bookingService;
        private readonly IPdfGeneratorService _pdfService;
        private readonly IMailService _mailService;

        public BookingController(
            IBookingService bookingService,
            IPdfGeneratorService pdfService,
            IMailService mailService
        )
        {
            _bookingService = bookingService;
            _pdfService = pdfService;
            _mailService = mailService;
        }

        [HttpGet]
        public async Task<ActionResult<List<BookingReadDTO>>> GetAll()
        {
            return Ok(await _bookingService.GetAll());
        }

        [HttpGet("{uuid}")]
        public async Task<ActionResult<BookingReadDTO>> GetByUuid(string uuid)
        {
            BookingReadDTO? bookingReadDTO = await _bookingService.GetByUuid(uuid);
            return bookingReadDTO is null ? NotFound() : Ok(bookingReadDTO);
        }

        [HttpPut("{uuid}")]
        public async Task<ActionResult<BookingReadDTO>> Update(string uuid, BookingCreateDTO bookingCreateDTO)
        {
            BookingReadDTO? bookingReadDTO = await _bookingService.Update(uuid, bookingCreateDTO);
            return bookingReadDTO is null ? NotFound() : Ok(bookingReadDTO);
        }

        [HttpPost]
        public async Task<ActionResult<BookingReadDTO>> Create(BookingCreateDTO bookingCreateDTO)
        {
            return Ok(await _bookingService.Create(bookingCreateDTO));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            await _bookingService.DeleteAll();
            return Ok();
        }

        [HttpPost("Signing")]
        public async Task<ActionResult> Signing(BookingSigningDTO bookingSigningDTO)
        {
            BookingReadDTO? bookingReadDTO = await _bookingService.Sign(bookingSigningDTO);

            if (bookingReadDTO is null)
            {
                return NotFound();
            }

            string html = await getDocumentHtml(bookingReadDTO);
            byte[] bytes = _pdfService.HtmlToPdf(html);
            string fileName = getValidFilename(_bookingService.FormatString(_bookingService.GetSignDocumentName(), bookingReadDTO));

            MailSendDTO mail = new MailSendDTO()
            {
                MailTo = bookingSigningDTO.Email,
                Subject = _bookingService.FormatString(_bookingService.GetSignMailSubject(), bookingReadDTO),
                Body = _bookingService.FormatString(_bookingService.GetSignMailBody(), bookingReadDTO),

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

        [HttpGet("Document/{uuid}")]
        public async Task<ActionResult<object>> Document(string uuid)
        {
            BookingReadDTO? bookingReadDTO = await _bookingService.GetByUuid(uuid);

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

        [HttpGet("Download/{uuid}")]
        public async Task<ActionResult> Download(string uuid)
        {
            BookingReadDTO? bookingReadDTO = await _bookingService.GetByUuid(uuid);

            if (bookingReadDTO is null)
            {
                return NotFound();
            }

            string html = await getDocumentHtml(bookingReadDTO);
            byte[] bytes = _pdfService.HtmlToPdf(html);
            string fileName = getValidFilename(_bookingService.FormatString(_bookingService.GetSignDocumentName(), bookingReadDTO));

            return File(bytes, _pdfService.GetPdfContentType(), fileName);
        }

        private async Task<string> getDocumentHtml(BookingReadDTO bookingReadDTO)
        {
            return await RazorTemplateEngine.RenderAsync(documentViewPath, bookingReadDTO);
        }

        private string getValidFilename(string filename)
        {
            string regSearch = new string(Path.GetInvalidFileNameChars());
            Regex rg = new Regex(string.Format("[{0}]", Regex.Escape(regSearch)));

            return rg.Replace(filename, "");
        }
    }
}
