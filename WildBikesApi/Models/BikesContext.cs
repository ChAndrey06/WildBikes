
using Microsoft.Extensions.Options;
using WildBikesApi.Configuration;

namespace WildBikesApi.Models
{
    public class BikesContext : DbContext
    {
        private readonly ResourcesNames _resourcesNames;

        public BikesContext(
            DbContextOptions<BikesContext> options,
            IOptions<ResourcesNames> resourcesNames
        ) : base(options)
        {
            _resourcesNames = resourcesNames.Value;
        }

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Resource>().HasData(new Resource
            {
                Id = 1,
                Name = _resourcesNames.DocumentTemplate,
                Value = ""
            });
            
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Login = "admin",
                PasswordHash = "!admin12@"
            });
        }
    }
}
