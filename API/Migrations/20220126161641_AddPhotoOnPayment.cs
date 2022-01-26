using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddPhotoOnPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "Payments",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "616a4954-611f-4faa-86ff-e82b80b73512", "4e4a62fa-246f-4742-a2af-7220de53fb7a", "USER", "USER" },
                    { "c8d2a1be-41c2-441d-bc42-5250f38d4645", "8cd08e8b-0d77-43fa-bdbe-5293cc840a65", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_PhotoId",
                table: "Payments",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Photos_PhotoId",
                table: "Payments",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Photos_PhotoId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_PhotoId",
                table: "Payments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "616a4954-611f-4faa-86ff-e82b80b73512");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8d2a1be-41c2-441d-bc42-5250f38d4645");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Payments");

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
    }
}
