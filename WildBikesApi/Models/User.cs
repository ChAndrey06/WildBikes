using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Login { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public virtual ICollection<RefreshToken>? RefreshTokens { get; set; }
    }
}
