using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();

        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? MiddleName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Passport { get; set; } = string.Empty;

        [MaxLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Nationality { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Helmet { get; set; } = string.Empty;

        [MaxLength(50)]
        public string BikeName { get; set; } = string.Empty;

        [MaxLength(10)]
        public string BikeNumber { get; set; } = string.Empty;
        public int BikeId { get; set; }
        public DateTime DateFrom { get; set; } = new DateTime();
        public DateTime DateTo { get; set; } = new DateTime();
        public decimal Price { get; set; } = decimal.Zero;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Signature { get; set; }
    }
}
