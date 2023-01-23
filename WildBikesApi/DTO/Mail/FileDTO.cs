using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.Mail
{
    public class FileDTO
    {
        [Required]
        public string FileName { get; set; } = "";

        public byte[] Bytes { get; set; } = new byte[0];

        [Required]
        public string ContentType { get; set; } = "";
    }
}
