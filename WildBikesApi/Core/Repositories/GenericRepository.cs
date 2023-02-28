namespace WildBikesApi.Core.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseModel
    {
        protected BikesContext _context;
        internal DbSet<T> _dbSet;

        public GenericRepository(BikesContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual bool Add(T entity)
        {
            _dbSet.Add(entity);
            return true;
        }

        public virtual bool Update(T entity, T newEntity)
        {
            entity.UpdateWith(newEntity);
            return true;
        }

        public virtual bool Delete(T entity)
        {
            _dbSet.Remove(entity);
            return true;
        }
    }
}
