using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class RemoveEmailInUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43f56af5-4780-4427-ab35-1ae7498462d1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9a61fd54-d4e1-496b-949c-bd4c17e2a421");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "48c51bdf-5505-4071-95d0-eee40d78ddb5", "f186c5ec-16e9-41c5-9857-fc0e37569e09", "Admin", "ADMIN" },
                    { "61b464c8-d0df-43a7-8464-d0a3e0304c7a", "573f71b1-6979-4a10-96c7-deee613e5a9f", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48c51bdf-5505-4071-95d0-eee40d78ddb5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61b464c8-d0df-43a7-8464-d0a3e0304c7a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "43f56af5-4780-4427-ab35-1ae7498462d1", "012f1eea-e42a-41d0-abb0-e18b9e9bf004", "USER", "USER" },
                    { "9a61fd54-d4e1-496b-949c-bd4c17e2a421", "a5972799-5862-4a8c-8e9c-2877fc04cb73", "Admin", "ADMIN" }
                });
        }
    }
}
