using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddIsEnabledInModeOfPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "573d9b07-9417-40df-bab9-d167d7c6e98b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "73bb57a3-253a-4e64-be68-12cd156b1d88");

            migrationBuilder.AddColumn<bool>(
                name: "IsEnabled",
                table: "ModeOfPayments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "436644e7-83e2-4c75-af5b-aa5ab6715a39", "8f06392b-7ee5-49c6-8f7f-598481b722db", "USER", "USER" },
                    { "fe674c1f-f0d5-4a78-854e-543bd0fa0b9d", "21731c34-2086-4f9d-b862-471089b421ba", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "436644e7-83e2-4c75-af5b-aa5ab6715a39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe674c1f-f0d5-4a78-854e-543bd0fa0b9d");

            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "ModeOfPayments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "573d9b07-9417-40df-bab9-d167d7c6e98b", "2a60e892-e458-45bf-a081-b53c6dcdc09a", "Admin", "ADMIN" },
                    { "73bb57a3-253a-4e64-be68-12cd156b1d88", "3d7d39a0-5a49-44d6-8f3f-aee60743be2a", "USER", "USER" }
                });
        }
    }
}
