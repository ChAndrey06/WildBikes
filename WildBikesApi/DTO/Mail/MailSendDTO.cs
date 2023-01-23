using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.DTO.Mail
{
    public class MailSendDTO
    {
        public string? MailTo { get; set; }

        [Required]
        public string Subject { get; set; } = "";

        [Required]
        public string Body { get; set; } = "";

        public FileDTO? File { get; set; }
    }
}
