using WildBikesApi.DTO.Mail;

namespace WildBikesApi.Services.MailService
{
    public interface IMailService
    {
        Task SendEmailAsync(MailSendDTO mailSendDTO);
    }
}
