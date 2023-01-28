using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WildBikesApi.Migrations
{
    /// <inheritdoc />
    public partial class byteToStringResourceValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Resources",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");

            migrationBuilder.UpdateData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Value",
                table: "Resources",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Resources",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: new byte[0]);
        }
    }
}
