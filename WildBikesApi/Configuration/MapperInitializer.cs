using AutoMapper;
using WildBikesApi.DTO.Booking;
using WildBikesApi.DTO.User;
using WildBikesApi.Models;

namespace WildBikesApi.Configurations
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer()
        {
            CreateMap<Booking, BookingSigningDTO>().ReverseMap();
            CreateMap<Booking, BookingCreateDTO>().ReverseMap();
            CreateMap<Booking, BookingReadDTO>().ReverseMap();

            CreateMap<User, UserReadDTO>().ReverseMap();
            CreateMap<User, UserCreateDTO>().ReverseMap();
            CreateMap<User, UserTokenDTO>().ReverseMap();
        }
    }
}
