using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.User
{
    public class UserCreateDTO : UserReadDTO
    {
        public string PasswordHash { get; set; } = "";
    }
}
