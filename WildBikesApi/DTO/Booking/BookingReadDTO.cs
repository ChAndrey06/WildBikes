
using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.Booking
{
    public class BookingReadDTO : BookingCreateDTO
    {
        public int Id { get; set; }
        public Guid Uuid { get; set; }
    }
}
