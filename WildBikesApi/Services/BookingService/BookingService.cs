using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using WildBikesApi.DTO.Booking;

namespace WildBikesApi.Services.BookingService
{
    public class BookingService : IBookingService
    {
        private readonly BikesContext _context;
        private readonly IMapper _mapper;

        public BookingService(BikesContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<BookingReadDTO>> GetAll()
        {
            var bookingList = await _context.Bookings.ToListAsync();
            var bookingReadDTOList = _mapper.Map<List<Booking>, List<BookingReadDTO>>(bookingList);

            return bookingReadDTOList;
        }

        public async Task<BookingReadDTO?> GetByUuid(string uuid)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(i => i.Uuid.ToString().Equals(uuid));
            var bookingReadDTO = _mapper.Map<BookingReadDTO?>(booking);

            return bookingReadDTO;
        }

        public async Task<BookingReadDTO?> Update(string uuid, BookingCreateDTO bookingCreateDTO)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(i => i.Uuid.ToString().Equals(uuid));

            if (booking is null) return null;

            _mapper.Map(bookingCreateDTO, booking);
            await _context.SaveChangesAsync();

            var bookingReadDTO = _mapper.Map<BookingReadDTO?>(booking);

            return bookingReadDTO;
        }

        public async Task<BookingReadDTO> Create(BookingCreateDTO bookingCreateDTO)
        {
            var booking = _mapper.Map<Booking>(bookingCreateDTO);

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            var bookingReadDTO = _mapper.Map<BookingReadDTO>(booking);

            return bookingReadDTO;
        }

        public async Task DeleteAll()
        {
            var bookingList = await _context.Bookings.ToListAsync();

            foreach (var booking in bookingList)
            {
                _context.Bookings.Remove(booking);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<BookingReadDTO?> Sign(BookingSigningDTO bookingSigningDTO)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(i => i.Uuid.ToString().Equals(bookingSigningDTO.Uuid));

            if (booking is null) return null;

            booking.Signature = bookingSigningDTO.Signature;
            booking.Email = bookingSigningDTO.Email;

            await _context.SaveChangesAsync();

            var bookingReadDTO = _mapper.Map<BookingReadDTO>(booking);

            return bookingReadDTO;
        }

        public string GetSignMailSubject()
        {
            return "Bike booking {BikeName} {DateFrom} - {DateTo} {Price}";
        }

        public string GetSignMailBody()
        {
            return "Bike booking signed for {BikeName} {DateFrom} - {DateTo} {Price}. <br/> Signed booking is in attachments.";
        }

        public string GetSignDocumentName()
        {
            return "{BikeName}_{DateFrom}_{DateTo}_{Price}.pdf";
        }

        public string FormatString(string template, BookingReadDTO booking)
        {
            string result = template;

            result = result.Replace("{" + nameof(booking.BikeName) + "}", booking.BikeName);
            result = result.Replace("{" + nameof(booking.DateFrom) + "}", booking.DateFrom.ToShortDateString());
            result = result.Replace("{" + nameof(booking.DateTo) + "}", booking.DateTo.ToShortDateString());
            result = result.Replace("{" + nameof(booking.Price) + "}", booking.Price.ToString("N0"));

            return result;
        }
    }
}
