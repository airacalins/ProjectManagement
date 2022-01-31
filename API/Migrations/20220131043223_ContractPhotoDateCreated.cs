using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class ContractPhotoDateCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8536c357-8240-4a13-ba24-d0566c335c0b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cd7dc6b2-da19-4a09-aa75-3b33b7b54ec0");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DateCreated",
                table: "TenantContractPhotos",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61495b7a-f734-4e95-b6ba-8d1af7efabd2", "97949c03-5658-4640-995e-9f7ce29228eb", "Admin", "ADMIN" },
                    { "956dc371-d49d-4133-aae4-a44aaa0d5528", "d9e6696d-f190-4dfb-8e98-9f987297976b", "USER", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61495b7a-f734-4e95-b6ba-8d1af7efabd2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "956dc371-d49d-4133-aae4-a44aaa0d5528");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "TenantContractPhotos");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8536c357-8240-4a13-ba24-d0566c335c0b", "e39719fc-3b27-4738-9bc9-0bb03bf8b07f", "Admin", "ADMIN" },
                    { "cd7dc6b2-da19-4a09-aa75-3b33b7b54ec0", "bb2df3fd-4cb5-4300-841f-af27714c4904", "USER", "USER" }
                });
        }
    }
}
