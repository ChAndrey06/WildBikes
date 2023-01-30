using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace WildBikesApi.DTO.Booking
{
    public class BookingCreateDTO
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string MiddleName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        [Required]
        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

        [Required]
        [MaxLength(20)]
        public string Passport { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string LicenseNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Nationality { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Helmet { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? BikeName { get; set; }

        [Required]
        [MaxLength(10)]
        public string BikeNumber { get; set; } = string.Empty;

        public int? BikeId { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Signature { get; set; }

    }
}
