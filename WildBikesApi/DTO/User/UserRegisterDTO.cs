using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.User
{
    public class UserRegisterDTO
    {
        [MinLength(8), MaxLength(50)]
        public string Password { get; set; } = "";

        [MaxLength(50)]
        public string UserName { get; set; } = "";
    }
}
