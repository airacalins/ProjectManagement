using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddBusinessName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "52627f53-5997-4fbb-9c64-493071814383");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f76fd764-75d7-4ea8-b8f7-cfeb0da5c33f");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Tenants",
                newName: "BusinessName");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "573d9b07-9417-40df-bab9-d167d7c6e98b", "2a60e892-e458-45bf-a081-b53c6dcdc09a", "Admin", "ADMIN" },
                    { "73bb57a3-253a-4e64-be68-12cd156b1d88", "3d7d39a0-5a49-44d6-8f3f-aee60743be2a", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "573d9b07-9417-40df-bab9-d167d7c6e98b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "73bb57a3-253a-4e64-be68-12cd156b1d88");

            migrationBuilder.RenameColumn(
                name: "BusinessName",
                table: "Tenants",
                newName: "Email");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "52627f53-5997-4fbb-9c64-493071814383", "5e36594d-59e6-4fd6-a9ec-2926e4810203", "Admin", "ADMIN" },
                    { "f76fd764-75d7-4ea8-b8f7-cfeb0da5c33f", "91a4d2d3-c3f8-4ff0-a778-2be2978be6e9", "USER", "USER" }
                });
        }
    }
}
