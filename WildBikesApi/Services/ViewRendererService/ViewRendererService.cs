using RazorEngineCore;

namespace WildBikesApi.Services.ViewRendererService
{
    public class ViewRendererService : IViewRendererService
    {
        private static IDictionary<string, IRazorEngineCompiledTemplate> templates = new Dictionary<string, IRazorEngineCompiledTemplate>();

        public async Task AddOrUpdateTemplate(string key, string content)
        {
            templates[key] = await new RazorEngine().CompileAsync(content);
        }

        public async Task<string> Render(string key, object model)
        {
            string result = await templates[key].RunAsync(model);

            return result;
        }

        public bool TemplateExist(string key)
        {
            return templates.ContainsKey(key);
        }
    }
}
