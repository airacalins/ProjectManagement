using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddModeOfPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3d1aa9e1-f87f-4f35-a279-7d70fc56440f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d5c0dee3-70c1-405b-a59d-d74e7357313c");

            migrationBuilder.CreateTable(
                name: "ModeOfPayments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BankName = table.Column<string>(type: "text", nullable: false),
                    AccountName = table.Column<string>(type: "text", nullable: false),
                    AccountNumber = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModeOfPayments", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "17f20aba-1798-4375-a76c-517a1da3ee16", "f6b85a24-8551-4f89-91b1-b4e634020624", "Admin", "ADMIN" },
                    { "ee60a78f-5be6-4722-8fee-a3e28c0d9c9f", "dd3388c8-f005-4242-9d6f-920e05c49945", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModeOfPayments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "17f20aba-1798-4375-a76c-517a1da3ee16");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ee60a78f-5be6-4722-8fee-a3e28c0d9c9f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3d1aa9e1-f87f-4f35-a279-7d70fc56440f", "31a37bca-4a4e-4459-8f63-c92a884c15aa", "USER", "USER" },
                    { "d5c0dee3-70c1-405b-a59d-d74e7357313c", "e54578d0-ddd9-4653-98be-b14ff6aac34e", "Admin", "ADMIN" }
                });
        }
    }
}
