using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WildBikesApi.Migrations
{
    /// <inheritdoc />
    public partial class UserLoginField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Login", "Name" },
                values: new object[] { "admin", "" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Login",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "UserName");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserName",
                value: "admin");
        }
    }
}
