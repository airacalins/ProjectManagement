using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class DisabledPasswordRestrictions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "436644e7-83e2-4c75-af5b-aa5ab6715a39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe674c1f-f0d5-4a78-854e-543bd0fa0b9d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c2919718-fe8b-4d59-a460-a98f42aa2828", "44a5f1fd-ad6b-4744-bea8-e07b2576308b", "Admin", "ADMIN" },
                    { "f284c6b9-4b88-45a4-9f6b-556e73d20eed", "c9a45590-218e-43bf-836a-17e4d9f6577e", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c2919718-fe8b-4d59-a460-a98f42aa2828");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f284c6b9-4b88-45a4-9f6b-556e73d20eed");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "436644e7-83e2-4c75-af5b-aa5ab6715a39", "8f06392b-7ee5-49c6-8f7f-598481b722db", "USER", "USER" },
                    { "fe674c1f-f0d5-4a78-854e-543bd0fa0b9d", "21731c34-2086-4f9d-b862-471089b421ba", "Admin", "ADMIN" }
                });
        }
    }
}
