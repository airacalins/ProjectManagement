using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddIsEnabledOnModeOfPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "14851fa6-d897-41a0-86c4-ac218e4d80fc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "881bf6a1-2832-41da-a810-ab942cca8db3");

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
                    { "bd94868d-6619-4b6a-a781-4ee98ae43964", "841bd294-3261-4aec-b4bc-992a5423127b", "Admin", "ADMIN" },
                    { "c287ff7a-e4d9-46b6-b7e1-d971eb70775b", "aea57dd2-7732-4f61-89b0-6b559b073c36", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd94868d-6619-4b6a-a781-4ee98ae43964");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c287ff7a-e4d9-46b6-b7e1-d971eb70775b");

            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "ModeOfPayments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "14851fa6-d897-41a0-86c4-ac218e4d80fc", "e51d6698-e759-4db1-bad2-e9f98c22a9ee", "USER", "USER" },
                    { "881bf6a1-2832-41da-a810-ab942cca8db3", "d04298a5-ca5b-4b42-8c09-68e6c943b05a", "Admin", "ADMIN" }
                });
        }
    }
}
