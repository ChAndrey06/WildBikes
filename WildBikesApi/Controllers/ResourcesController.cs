using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WildBikesApi.Configuration;
using WildBikesApi.DTO.Resources;
using WildBikesApi.Services.BookingService;
using WildBikesApi.Services.PdfGeneratorService;
using WildBikesApi.Services.ResourcesService;
using WildBikesApi.Services.ViewRendererService;

namespace WildBikesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
    {
        private readonly IResourcesService _resourcesService;
        private readonly IViewRendererService _viewRendererService;
        private readonly ResourcesNames _resourcesNames;

        public ResourcesController(
            IResourcesService resourcesService, 
            IViewRendererService viewRendererService,
            IOptions<ResourcesNames> resourcesNames
        )
        {
            _resourcesService = resourcesService;
            _viewRendererService = viewRendererService;
            _resourcesNames = resourcesNames.Value;
        }

        [HttpGet("Document-Template")]
        public async Task<ActionResult<DocumentTemplateDTO>> GetDocumentTemplate()
        {
            string documentTemplate = await _resourcesService.GetValueByName(_resourcesNames.DocumentTemplate);

            return Ok(new DocumentTemplateDTO { template = documentTemplate });
        }

        [HttpPost("Document-Template")]
        public async Task<ActionResult> UpdateDocumentTemplate(DocumentTemplateDTO documentTemplateDTO)
        {
            await _resourcesService.SetValueByName(_resourcesNames.DocumentTemplate, documentTemplateDTO.template);
            await _viewRendererService.AddOrUpdateTemplate(_resourcesNames.DocumentTemplate, documentTemplateDTO.template);

            return Ok();
        }
    }
}
