using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WildBikesApi.Migrations
{
    /// <inheritdoc />
    public partial class BookingTableBikeNameAndNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BikeName",
                table: "Bookings",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BikeNumber",
                table: "Bookings",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BikeName",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "BikeNumber",
                table: "Bookings");
        }
    }
}
