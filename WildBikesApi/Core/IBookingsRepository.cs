namespace WildBikesApi.Core
{
    public interface IBookingsRepository : IGenericRepository<Booking>
    {
        Task<IEnumerable<Bike>> SearchBikes(string query);
    }
}
