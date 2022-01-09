using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class ChangePhotoToNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Photos_PhotoId",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "359aa43e-eba4-409c-b8ba-12f32f256095");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8549faaf-3c88-40e3-b04a-0ff2ed3d63e1");

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "AspNetUsers",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5065299e-28f3-4686-9cc1-c7758c462546", "610bc6f6-55a6-4cb2-972b-2bb8260b5ae3", "Admin", "ADMIN" },
                    { "ecf00ef8-417a-4456-9b24-49536d8553d9", "f8c94acd-17a9-4ddb-adc7-03927211393c", "USER", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Photos_PhotoId",
                table: "AspNetUsers",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Photos_PhotoId",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5065299e-28f3-4686-9cc1-c7758c462546");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ecf00ef8-417a-4456-9b24-49536d8553d9");

            migrationBuilder.AlterColumn<Guid>(
                name: "PhotoId",
                table: "AspNetUsers",
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
                    { "359aa43e-eba4-409c-b8ba-12f32f256095", "3a607d39-9d03-4ee7-9ec1-76bf78e01dd4", "USER", "USER" },
                    { "8549faaf-3c88-40e3-b04a-0ff2ed3d63e1", "f1642175-f018-47a7-a92a-776822ccd3f6", "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Photos_PhotoId",
                table: "AspNetUsers",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
