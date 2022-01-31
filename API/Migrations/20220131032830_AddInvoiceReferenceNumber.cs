using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddInvoiceReferenceNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be01ffdf-5884-4c29-8a52-b058531ec3b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d86549e4-204d-4798-892c-bd38de4854e8");

            migrationBuilder.AddColumn<string>(
                name: "ReferenceNumber",
                table: "Payments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNumber",
                table: "Invoices",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8536c357-8240-4a13-ba24-d0566c335c0b", "e39719fc-3b27-4738-9bc9-0bb03bf8b07f", "Admin", "ADMIN" },
                    { "cd7dc6b2-da19-4a09-aa75-3b33b7b54ec0", "bb2df3fd-4cb5-4300-841f-af27714c4904", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8536c357-8240-4a13-ba24-d0566c335c0b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cd7dc6b2-da19-4a09-aa75-3b33b7b54ec0");

            migrationBuilder.DropColumn(
                name: "ReferenceNumber",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "InvoiceNumber",
                table: "Invoices");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "be01ffdf-5884-4c29-8a52-b058531ec3b6", "33cdd872-0ee9-4260-ab69-20f2a773ad9b", "Admin", "ADMIN" },
                    { "d86549e4-204d-4798-892c-bd38de4854e8", "accdd129-c075-497f-8432-d38e09f04825", "USER", "USER" }
                });
        }
    }
}
