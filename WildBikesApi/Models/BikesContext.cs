
namespace WildBikesApi.Models
{
    public class BikesContext : DbContext
    {
        public BikesContext(DbContextOptions<BikesContext> options) : base(options)
        {
        }

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
