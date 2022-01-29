using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddInvoiceStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48c51bdf-5505-4071-95d0-eee40d78ddb5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61b464c8-d0df-43a7-8464-d0a3e0304c7a");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceStatus",
                table: "Invoices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b10006a-2c46-448b-8924-62bea8e6f1ae", "5014196c-b58f-44de-a11d-95004072a343", "Admin", "ADMIN" },
                    { "4e1bc48f-d061-45e5-8611-a342fc9c5df9", "8e5d85d6-4874-425d-be66-59885dc235b2", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b10006a-2c46-448b-8924-62bea8e6f1ae");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e1bc48f-d061-45e5-8611-a342fc9c5df9");

            migrationBuilder.DropColumn(
                name: "InvoiceStatus",
                table: "Invoices");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "48c51bdf-5505-4071-95d0-eee40d78ddb5", "f186c5ec-16e9-41c5-9857-fc0e37569e09", "Admin", "ADMIN" },
                    { "61b464c8-d0df-43a7-8464-d0a3e0304c7a", "573f71b1-6979-4a10-96c7-deee613e5a9f", "USER", "USER" }
                });
        }
    }
}
