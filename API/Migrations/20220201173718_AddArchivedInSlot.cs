using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddArchivedInSlot : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2407ee55-d815-4296-91c5-5ce56c66a96f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "36c2f24d-eb9f-441b-a87d-f3319db07c76");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8de9e57a-ff06-4531-836c-b28c89623904");

            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "Units",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "189bb5f9-9db3-4706-9714-8617fc14db15", "3c08da73-0129-49d7-8140-556cfcd28a8d", "OWNER", "OWNER" },
                    { "8b0e83ce-78ea-4c92-b376-079c5d71cc7d", "550440c2-6903-4df8-9b8f-8439a4da4938", "SYSAD", "SYSAD" },
                    { "b24df510-105e-40ad-b585-38b335134ab0", "02b9857c-8d04-4622-b689-a1a64c0fee3c", "ADMIN", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "189bb5f9-9db3-4706-9714-8617fc14db15");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b0e83ce-78ea-4c92-b376-079c5d71cc7d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b24df510-105e-40ad-b585-38b335134ab0");

            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "Units");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2407ee55-d815-4296-91c5-5ce56c66a96f", "31786b1c-fd05-4eb8-a0a2-274bc89c46c3", "SYSAD", "SYSAD" },
                    { "36c2f24d-eb9f-441b-a87d-f3319db07c76", "279dc64d-1431-465d-92ca-7ce1858a16fc", "OWNER", "OWNER" },
                    { "8de9e57a-ff06-4531-836c-b28c89623904", "0526f404-da1d-4d98-ba7c-9301fe9a73d4", "ADMIN", "ADMIN" }
                });
        }
    }
}
