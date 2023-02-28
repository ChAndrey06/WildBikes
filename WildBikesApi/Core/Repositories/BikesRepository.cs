namespace WildBikesApi.Core.Repositories
{
    public class BikesRepository : GenericRepository<Bike>, IBikesRepository
    {
        public BikesRepository(BikesContext context) : base(context)
        {
        }
    }
}
