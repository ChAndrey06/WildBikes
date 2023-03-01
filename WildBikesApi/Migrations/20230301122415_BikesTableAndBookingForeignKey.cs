using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WildBikesApi.Migrations
{
    /// <inheritdoc />
    public partial class BikesTableAndBookingForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BikeId",
                table: "Bookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Bikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bikes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BikeId",
                table: "Bookings",
                column: "BikeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Bikes_BikeId",
                table: "Bookings",
                column: "BikeId",
                principalTable: "Bikes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Bikes_BikeId",
                table: "Bookings");

            migrationBuilder.DropTable(
                name: "Bikes");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_BikeId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "BikeId",
                table: "Bookings");
        }
    }
}
