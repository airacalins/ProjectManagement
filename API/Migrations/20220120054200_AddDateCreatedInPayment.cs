using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddDateCreatedInPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08c4f7fc-f7ea-4bbf-b397-f71dc650e120");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a536e08c-fcd8-4fe1-affc-5562ae89fab4");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DateCreated",
                table: "Payments",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c6d8ae8-7e16-43f9-a1cf-845a6ca68b5b", "a446a1ce-1314-455e-aa11-30b0c6095301", "USER", "USER" },
                    { "90689457-bf83-4a03-af49-ccfb0b2569e8", "bb5f35a6-d39e-4a3b-9c29-97bffd74c5f3", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c6d8ae8-7e16-43f9-a1cf-845a6ca68b5b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "90689457-bf83-4a03-af49-ccfb0b2569e8");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Payments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08c4f7fc-f7ea-4bbf-b397-f71dc650e120", "9484cb0e-c348-4d21-8929-521c3d43baad", "USER", "USER" },
                    { "a536e08c-fcd8-4fe1-affc-5562ae89fab4", "f8902f18-de19-40b8-9956-456214c70329", "Admin", "ADMIN" }
                });
        }
    }
}
