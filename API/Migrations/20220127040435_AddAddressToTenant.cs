using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddAddressToTenant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81bd4a65-3c4e-409b-b551-943f897d3479");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f843b118-0205-4d11-ba6f-dfca258dbd41");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Tenants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "43f56af5-4780-4427-ab35-1ae7498462d1", "012f1eea-e42a-41d0-abb0-e18b9e9bf004", "USER", "USER" },
                    { "9a61fd54-d4e1-496b-949c-bd4c17e2a421", "a5972799-5862-4a8c-8e9c-2877fc04cb73", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43f56af5-4780-4427-ab35-1ae7498462d1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9a61fd54-d4e1-496b-949c-bd4c17e2a421");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Tenants");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "81bd4a65-3c4e-409b-b551-943f897d3479", "b33cb981-2dce-4d3e-8f4b-670582864dec", "USER", "USER" },
                    { "f843b118-0205-4d11-ba6f-dfca258dbd41", "b752988a-93bb-4612-a70e-7a997a3c6532", "Admin", "ADMIN" }
                });
        }
    }
}
