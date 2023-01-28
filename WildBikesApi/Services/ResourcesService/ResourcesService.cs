using Microsoft.Extensions.Options;
using WildBikesApi.Configuration;

namespace WildBikesApi.Services.ResourcesService
{
    public class ResourcesService : IResourcesService
    {
        private readonly BikesContext _context;

        public ResourcesService(BikesContext context)
        {
            _context = context;
        }

        public async Task<string> GetValueByName(string name)
        {
            Resource resource = await _context.Resources.FirstAsync(i => i.Name.Equals(name));

            return resource.Value;
        }

        public async Task SetValueByName(string name, string template)
        {
            Resource resource = await _context.Resources.FirstAsync(i => i.Name.Equals(name));
            resource.Value = template;

            await _context.SaveChangesAsync();
        }
    }
}
