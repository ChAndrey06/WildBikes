namespace WildBikesApi.Core.Repositories
{
    public class BookingsRepository : GenericRepository<Booking>, IBookingsRepository
    {
        public BookingsRepository(BikesContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Bike>> SearchBikes(string query)
        {
            var bikes = await _context.Bikes.Where(i => i.Name.Contains(query)).OrderBy(i => i.Name).ToListAsync();
            return bikes;
        }
    }
}
