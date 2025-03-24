using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Worker.Migrations
{
    /// <inheritdoc />
    public partial class RoundThree : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClothingColors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClothingColor = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClothingColors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClothingTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClothingItemType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClothingTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClothingFit = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClothingItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<double>(type: "double precision", nullable: true),
                    Image = table.Column<string>(type: "text", nullable: true),
                    Link = table.Column<string>(type: "text", nullable: true),
                    TypeId = table.Column<int>(type: "integer", nullable: true),
                    StyleId = table.Column<int>(type: "integer", nullable: true),
                    ColorId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClothingItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClothingItems_ClothingColors_ColorId",
                        column: x => x.ColorId,
                        principalTable: "ClothingColors",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ClothingItems_ClothingTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "ClothingTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ClothingItems_Fits_StyleId",
                        column: x => x.StyleId,
                        principalTable: "Fits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItems_ColorId",
                table: "ClothingItems",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItems_StyleId",
                table: "ClothingItems",
                column: "StyleId");

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItems_TypeId",
                table: "ClothingItems",
                column: "TypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClothingItems");

            migrationBuilder.DropTable(
                name: "ClothingColors");

            migrationBuilder.DropTable(
                name: "ClothingTypes");

            migrationBuilder.DropTable(
                name: "Fits");
        }
    }
}
