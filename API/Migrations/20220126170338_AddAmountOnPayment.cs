using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddAmountOnPayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "616a4954-611f-4faa-86ff-e82b80b73512");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8d2a1be-41c2-441d-bc42-5250f38d4645");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Payments",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "81bd4a65-3c4e-409b-b551-943f897d3479", "b33cb981-2dce-4d3e-8f4b-670582864dec", "USER", "USER" },
                    { "f843b118-0205-4d11-ba6f-dfca258dbd41", "b752988a-93bb-4612-a70e-7a997a3c6532", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81bd4a65-3c4e-409b-b551-943f897d3479");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f843b118-0205-4d11-ba6f-dfca258dbd41");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Payments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "616a4954-611f-4faa-86ff-e82b80b73512", "4e4a62fa-246f-4742-a2af-7220de53fb7a", "USER", "USER" },
                    { "c8d2a1be-41c2-441d-bc42-5250f38d4645", "8cd08e8b-0d77-43fa-bdbe-5293cc840a65", "Admin", "ADMIN" }
                });
        }
    }
}
