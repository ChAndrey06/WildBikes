namespace WildBikesApi.Core
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        bool Add(T entity);
        bool Update(T entity, T newEntity);
        bool Delete(T entity);
    }
}
