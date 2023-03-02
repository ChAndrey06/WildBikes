using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WildBikesApi.Migrations
{
    /// <inheritdoc />
    public partial class BikesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "BikeName",
            //    table: "Bookings");

            //migrationBuilder.DropColumn(
            //    name: "BikeNumber",
            //    table: "Bookings");

            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "Bookings");

            migrationBuilder.CreateTable(
                name: "Bikes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Number = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bikes", x => x.Id);
                });

            migrationBuilder.AlterColumn<int>(
                name: "BikeId",
                table: "Bookings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.Sql("UPDATE Bookings SET BikeId = NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BikeId",
                table: "Bookings",
                column: "BikeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Bikes_BikeId",
                table: "Bookings",
                column: "BikeId",
                principalTable: "Bikes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "Bookings",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
