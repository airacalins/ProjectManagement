using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddAnnouncement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5cd49fa3-8d52-4e96-95ed-bd4f4bc52102");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8d2f795-ef02-40da-a0d6-b5ec4233be21");

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    DateCreated = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    IsArchived = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3d1aa9e1-f87f-4f35-a279-7d70fc56440f", "31a37bca-4a4e-4459-8f63-c92a884c15aa", "USER", "USER" },
                    { "d5c0dee3-70c1-405b-a59d-d74e7357313c", "e54578d0-ddd9-4653-98be-b14ff6aac34e", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3d1aa9e1-f87f-4f35-a279-7d70fc56440f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d5c0dee3-70c1-405b-a59d-d74e7357313c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5cd49fa3-8d52-4e96-95ed-bd4f4bc52102", "42b08963-cd25-436d-8687-0ef6920a14bc", "USER", "USER" },
                    { "d8d2f795-ef02-40da-a0d6-b5ec4233be21", "c7fc7fa2-1136-45b1-b7ce-003ddc214e4d", "Admin", "ADMIN" }
                });
        }
    }
}
