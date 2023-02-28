using WildBikesApi.Core.Repositories;
using WildBikesApi.Core;

namespace WildBikesApi.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly BikesContext _context;

        public IBikesRepository Bikes { get; private set; }
        public IBookingsRepository Bookings { get; private set; }

        public UnitOfWork(BikesContext context)
        {
            _context = context;

            Bikes = new BikesRepository(_context);
            Bookings = new BookingsRepository(_context);
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
