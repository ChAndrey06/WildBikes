using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using WildBikesApi.Configuration;
using WildBikesApi.DTO.Mail;

namespace WildBikesApi.Services.MailService
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task SendEmailAsync(MailSendDTO mailSendDTO)
        {
            MimeMessage email = new MimeMessage();
            email.Sender = new MailboxAddress(_mailSettings.DisplayName, _mailSettings.MailFrom);
            email.From.Add(email.Sender);

            email.To.AddRange(InternetAddressList.Parse(_mailSettings.MailTo));

            if (mailSendDTO.MailTo is not null)
            {
                email.To.AddRange(InternetAddressList.Parse(mailSendDTO.MailTo));
            }

            email.Subject = mailSendDTO.Subject;

            BodyBuilder builder = new BodyBuilder();

            if (mailSendDTO.File is not null)
            {
                FileDTO? file = mailSendDTO.File;

                if (file.Bytes.Length > 0)
                {
                    builder.Attachments.Add(file.FileName, file.Bytes, ContentType.Parse(file.ContentType));
                }
            }

            builder.HtmlBody = mailSendDTO.Body;
            email.Body = builder.ToMessageBody();

            using SmtpClient smtp = new SmtpClient();

            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.MailFrom, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
