namespace WildBikesApi.Core
{
    public interface IUnitOfWork
    {
        IBikesRepository Bikes { get; }

        IBookingsRepository Bookings { get; }

        Task CompleteAsync();
    }
}
