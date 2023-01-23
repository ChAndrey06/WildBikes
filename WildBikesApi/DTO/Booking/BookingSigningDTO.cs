
using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.Booking
{
    public class BookingSigningDTO
    {
        [Required]
        public string Uuid { get; set; } = "";

        [Required]
        public string Signature { get; set; } = string.Empty;

        [EmailAddress]
        public string? Email { get; set; }
    }
}
