namespace WildBikesApi.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Value { get; set; } = string.Empty;

        public DateTime? ExpiryTime { get; set; }

        public virtual User? User { get; set; }
    }
}
