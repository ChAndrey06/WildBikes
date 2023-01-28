using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string UserName { get; set; } = "";

        public string PasswordHash { get; set; } = "";

        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
