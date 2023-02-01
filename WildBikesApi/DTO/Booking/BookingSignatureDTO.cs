
using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.Booking
{
    public class BookingSignatureDTO
    {
        [Required]
        public string Signature { get; set; } = string.Empty;

        [EmailAddress]
        public string? Email { get; set; }
    }
}
