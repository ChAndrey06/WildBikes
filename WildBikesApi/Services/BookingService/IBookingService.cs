using WildBikesApi.DTO.Booking;

namespace WildBikesApi.Services.BookingService
{
    public interface IBookingService
    {
        Task<List<BookingReadDTO>> GetAll();
        Task<BookingReadDTO?> GetByUuid(string uuid);
        Task<BookingReadDTO> Create(BookingCreateDTO bookingCreateDTO);
        Task<BookingReadDTO> Update(string uuid, BookingCreateDTO bookingCreateDTO);
        Task DeleteAll();
        Task<BookingReadDTO?> Sign(BookingSigningDTO bookingSigningDTO);
        string GetSignMailSubject();
        string GetSignMailBody();
        string GetSignDocumentName();
        string FormatString(string template, BookingReadDTO booking);
    }
}
