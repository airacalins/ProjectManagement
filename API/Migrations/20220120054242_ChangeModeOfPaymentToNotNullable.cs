using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class ChangeModeOfPaymentToNotNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_ModeOfPayments_ModeOfPaymentId",
                table: "Payments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c6d8ae8-7e16-43f9-a1cf-845a6ca68b5b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "90689457-bf83-4a03-af49-ccfb0b2569e8");

            migrationBuilder.AlterColumn<Guid>(
                name: "ModeOfPaymentId",
                table: "Payments",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "04363806-5864-44cd-a479-c081cba3f77c", "d995700a-7c9d-4398-a037-10efc8a7557a", "USER", "USER" },
                    { "f4085a9a-5e8b-4d33-b43b-51aa7423f53e", "041dc8f5-1a86-4a0e-a954-cbafd733a26a", "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_ModeOfPayments_ModeOfPaymentId",
                table: "Payments",
                column: "ModeOfPaymentId",
                principalTable: "ModeOfPayments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_ModeOfPayments_ModeOfPaymentId",
                table: "Payments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "04363806-5864-44cd-a479-c081cba3f77c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f4085a9a-5e8b-4d33-b43b-51aa7423f53e");

            migrationBuilder.AlterColumn<Guid>(
                name: "ModeOfPaymentId",
                table: "Payments",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c6d8ae8-7e16-43f9-a1cf-845a6ca68b5b", "a446a1ce-1314-455e-aa11-30b0c6095301", "USER", "USER" },
                    { "90689457-bf83-4a03-af49-ccfb0b2569e8", "bb5f35a6-d39e-4a3b-9c29-97bffd74c5f3", "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_ModeOfPayments_ModeOfPaymentId",
                table: "Payments",
                column: "ModeOfPaymentId",
                principalTable: "ModeOfPayments",
                principalColumn: "Id");
        }
    }
}
