using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.User
{
    public class UserReadDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        public string Login { get; set; } = "";
    }
}
