using System.ComponentModel.DataAnnotations;

namespace WildBikesApi.Models
{
    public class Bike : BaseModel
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(10)]
        public string Number { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Brand { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Model { get; set; } = string.Empty;

        public DateTime PurchaseDate { get; set; }

        public override void UpdateWith(BaseModel bike)
        {
            Bike newBike = (Bike)bike;

            this.Name = newBike.Name;
            this.Number = newBike.Number;
            this.Brand = newBike.Brand;
            this.Model = newBike.Model;
            this.PurchaseDate = newBike.PurchaseDate;
        }
    }
}
