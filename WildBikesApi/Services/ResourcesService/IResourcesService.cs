namespace WildBikesApi.Services.ResourcesService
{
    public interface IResourcesService
    {
        Task<string> GetValueByName(string name);
        Task SetValueByName(string name, string template);
    }
}
