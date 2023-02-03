using WildBikesApi.DTO.Booking;

namespace WildBikesApi.Services.BookingService
{
    public interface IBookingsService
    {
        Task<List<BookingReadDTO>> GetAll();
        Task<BookingReadDTO?> GetByUuid(string uuid);
        Task<BookingReadDTO> Create(BookingCreateDTO bookingCreateDTO);
        Task<BookingReadDTO?> Update(string uuid, BookingCreateDTO bookingCreateDTO);
        Task DeleteAll();
        Task DeleteMany(string[] uuids);
        Task<BookingReadDTO?> Sign(string uuid, BookingSignatureDTO bookingSigningDTO);
        string GetSignMailSubject();
        string GetSignMailBody();
        string GetSignDocumentName();
        string FormatString(string template, BookingReadDTO booking);
    }
}
