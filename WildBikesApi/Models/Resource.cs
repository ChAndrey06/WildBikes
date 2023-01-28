using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.Models
{
    [Index("Name", IsUnique = true)]
    public class Resource
    {
        public int Id { get; set; }

        [MaxLength(400)]
        public string Name { get; set; } = "";
        public string Value { get; set; } = "";
    }
}
