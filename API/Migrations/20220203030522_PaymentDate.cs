using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class PaymentDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "DatePaid",
                table: "Invoices",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LastPaymentDate",
                table: "Invoices",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "47988d93-3980-4b17-b643-a541e4b66cbe", "25e40e60-d5c5-4662-b143-2a7695e1b79e", "ADMIN", "ADMIN" },
                    { "8e9b332f-cc96-42cc-b47a-68bdd98618e4", "3da51333-eb95-4b87-8279-9994b4975e5d", "SYSAD", "SYSAD" },
                    { "ddc9bf86-8726-43a6-b1fb-580873ba443f", "24964bfe-d6e6-4242-838c-a2779bae17b3", "OWNER", "OWNER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47988d93-3980-4b17-b643-a541e4b66cbe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8e9b332f-cc96-42cc-b47a-68bdd98618e4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ddc9bf86-8726-43a6-b1fb-580873ba443f");

            migrationBuilder.DropColumn(
                name: "DatePaid",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "LastPaymentDate",
                table: "Invoices");

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
    }
}
