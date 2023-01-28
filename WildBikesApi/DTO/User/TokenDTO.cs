using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.User
{
    public class TokenDTO
    {
        [Required]
        public string AccessToken { get; set; } = "";
        
        [Required]
        public string RefreshToken { get; set; } = "";
    }
}
