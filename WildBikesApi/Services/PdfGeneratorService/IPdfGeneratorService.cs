using WildBikesApi.DTO.Booking;

namespace WildBikesApi.Services.PdfGeneratorService
{
    public interface IPdfGeneratorService
    {
        byte[] HtmlToPdf(string html);
        string GetPdfContentType();
    }
}
