using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddContractPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "597c9ea1-826d-4410-bc1c-409b55dd4866");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b33a5c11-6802-4801-a1f4-a2bd934ba727");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256);

            migrationBuilder.CreateTable(
                name: "TenantContractPhotos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TenantContractId = table.Column<Guid>(type: "uuid", nullable: false),
                    PhotoId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TenantContractPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TenantContractPhotos_Photos_PhotoId",
                        column: x => x.PhotoId,
                        principalTable: "Photos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TenantContractPhotos_TenantContracts_TenantContractId",
                        column: x => x.TenantContractId,
                        principalTable: "TenantContracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "be01ffdf-5884-4c29-8a52-b058531ec3b6", "33cdd872-0ee9-4260-ab69-20f2a773ad9b", "Admin", "ADMIN" },
                    { "d86549e4-204d-4798-892c-bd38de4854e8", "accdd129-c075-497f-8432-d38e09f04825", "USER", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TenantContractPhotos_PhotoId",
                table: "TenantContractPhotos",
                column: "PhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_TenantContractPhotos_TenantContractId",
                table: "TenantContractPhotos",
                column: "TenantContractId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TenantContractPhotos");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be01ffdf-5884-4c29-8a52-b058531ec3b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d86549e4-204d-4798-892c-bd38de4854e8");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "AspNetUsers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "597c9ea1-826d-4410-bc1c-409b55dd4866", "bbc36d5d-c64b-4620-8be6-a809dfa89f8b", "Admin", "ADMIN" },
                    { "b33a5c11-6802-4801-a1f4-a2bd934ba727", "85882901-4657-4b30-a98f-64da777ca3bf", "USER", "USER" }
                });
        }
    }
}
