using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddPhotoOnModeOfPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd94868d-6619-4b6a-a781-4ee98ae43964");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c287ff7a-e4d9-46b6-b7e1-d971eb70775b");

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "ModeOfPayments",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ccd6aff3-69c6-4dd6-bc1f-709359ceed5c", "a04f30c0-5afe-42cb-a0a0-10b27150ae52", "Admin", "ADMIN" },
                    { "de9b3cd0-c315-4974-9205-86f829fe1b1d", "32cfba73-57a4-4827-a945-ad9ecf60dd45", "USER", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ModeOfPayments_PhotoId",
                table: "ModeOfPayments",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ModeOfPayments_Photos_PhotoId",
                table: "ModeOfPayments",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ModeOfPayments_Photos_PhotoId",
                table: "ModeOfPayments");

            migrationBuilder.DropIndex(
                name: "IX_ModeOfPayments_PhotoId",
                table: "ModeOfPayments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ccd6aff3-69c6-4dd6-bc1f-709359ceed5c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de9b3cd0-c315-4974-9205-86f829fe1b1d");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "ModeOfPayments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bd94868d-6619-4b6a-a781-4ee98ae43964", "841bd294-3261-4aec-b4bc-992a5423127b", "Admin", "ADMIN" },
                    { "c287ff7a-e4d9-46b6-b7e1-d971eb70775b", "aea57dd2-7732-4f61-89b0-6b559b073c36", "USER", "USER" }
                });
        }
    }
}
