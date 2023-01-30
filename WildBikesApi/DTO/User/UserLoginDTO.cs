using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.User
{
    public class UserLoginDTO
    {
        [MaxLength(20), Required]
        public string Login { get; set; } = "";

        [MinLength(8), MaxLength(50), Required]
        public string Password { get; set; } = "";
    }
}
