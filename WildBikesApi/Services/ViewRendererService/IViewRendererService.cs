using WildBikesApi.DTO.User;

namespace WildBikesApi.Services.ViewRendererService
{
    public interface IViewRendererService
    {
        Task AddOrUpdateTemplate(string key, string content);
        Task<string> Render(string key, object model);
        bool TemplateExist(string key);
    }
}
