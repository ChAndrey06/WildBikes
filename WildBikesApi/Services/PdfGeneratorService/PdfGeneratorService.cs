using SelectPdf;

namespace WildBikesApi.Services.PdfGeneratorService
{
    public class PdfGeneratorService : IPdfGeneratorService
    {
        public string GetPdfContentType()
        {
            return "application/pdf";
        }

        public byte[] HtmlToPdf(string html)
        {
            var htmlToPdf = new HtmlToPdf();

            htmlToPdf.Options.PdfPageSize = PdfPageSize.A4;
            htmlToPdf.Options.MarginLeft = 50;
            htmlToPdf.Options.MarginRight = -50;
            htmlToPdf.Options.MarginTop = 20;
            htmlToPdf.Options.MarginBottom = 20;

            var document = htmlToPdf.ConvertHtmlString(html);

            byte[] bytes = document.Save();
            document.Close();

            return bytes;
        }
    }
}
