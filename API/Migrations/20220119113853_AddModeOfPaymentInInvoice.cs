using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddModeOfPaymentInInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a24634a0-84fd-4528-8353-409506c05767");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4e9f55e-5e4d-4c9a-a041-a617bc821874");

            migrationBuilder.RenameColumn(
                name: "IsEnabled",
                table: "ModeOfPayments",
                newName: "IsArchived");

            migrationBuilder.AddColumn<Guid>(
                name: "ModeOfPaymentId",
                table: "Invoices",
                type: "uuid",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "158da936-3fcb-4d7e-ae0a-ca0443168d6d", "cb6b9b87-f9de-4684-831c-d3fc7c606a49", "Admin", "ADMIN" },
                    { "85d37848-4817-4637-8f6d-7a4bec2ab3a7", "e6f7680b-7455-4e3a-a918-836a4b6b788d", "USER", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_ModeOfPaymentId",
                table: "Invoices",
                column: "ModeOfPaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_ModeOfPayments_ModeOfPaymentId",
                table: "Invoices",
                column: "ModeOfPaymentId",
                principalTable: "ModeOfPayments",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_ModeOfPayments_ModeOfPaymentId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_ModeOfPaymentId",
                table: "Invoices");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "158da936-3fcb-4d7e-ae0a-ca0443168d6d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85d37848-4817-4637-8f6d-7a4bec2ab3a7");

            migrationBuilder.DropColumn(
                name: "ModeOfPaymentId",
                table: "Invoices");

            migrationBuilder.RenameColumn(
                name: "IsArchived",
                table: "ModeOfPayments",
                newName: "IsEnabled");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a24634a0-84fd-4528-8353-409506c05767", "eb08fb3c-9de9-4a5d-b23a-77cbc36d939e", "USER", "USER" },
                    { "b4e9f55e-5e4d-4c9a-a041-a617bc821874", "86b77da8-8cd5-4e6e-948c-3a4c0ef78933", "Admin", "ADMIN" }
                });
        }
    }
}
