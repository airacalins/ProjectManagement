using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class RemovePasswordComplexity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b10006a-2c46-448b-8924-62bea8e6f1ae");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e1bc48f-d061-45e5-8611-a342fc9c5df9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "597c9ea1-826d-4410-bc1c-409b55dd4866", "bbc36d5d-c64b-4620-8be6-a809dfa89f8b", "Admin", "ADMIN" },
                    { "b33a5c11-6802-4801-a1f4-a2bd934ba727", "85882901-4657-4b30-a98f-64da777ca3bf", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "597c9ea1-826d-4410-bc1c-409b55dd4866");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b33a5c11-6802-4801-a1f4-a2bd934ba727");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b10006a-2c46-448b-8924-62bea8e6f1ae", "5014196c-b58f-44de-a11d-95004072a343", "Admin", "ADMIN" },
                    { "4e1bc48f-d061-45e5-8611-a342fc9c5df9", "8e5d85d6-4874-425d-be66-59885dc235b2", "USER", "USER" }
                });
        }
    }
}
