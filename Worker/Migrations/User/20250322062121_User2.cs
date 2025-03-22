using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Worker.Migrations.User
{
    /// <inheritdoc />
    public partial class User2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClothingType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClothingItemType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClothingType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Color",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClothingColor = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Color", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClothingFit = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fit", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Outfits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Outfits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Outfits_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ClothingItem",
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
                    ColorId = table.Column<int>(type: "integer", nullable: true),
                    OutfitsId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClothingItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClothingItem_ClothingType_TypeId",
                        column: x => x.TypeId,
                        principalTable: "ClothingType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ClothingItem_Color_ColorId",
                        column: x => x.ColorId,
                        principalTable: "Color",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ClothingItem_Fit_StyleId",
                        column: x => x.StyleId,
                        principalTable: "Fit",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ClothingItem_Outfits_OutfitsId",
                        column: x => x.OutfitsId,
                        principalTable: "Outfits",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItem_ColorId",
                table: "ClothingItem",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItem_OutfitsId",
                table: "ClothingItem",
                column: "OutfitsId");

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItem_StyleId",
                table: "ClothingItem",
                column: "StyleId");

            migrationBuilder.CreateIndex(
                name: "IX_ClothingItem_TypeId",
                table: "ClothingItem",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Outfits_UserId",
                table: "Outfits",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClothingItem");

            migrationBuilder.DropTable(
                name: "ClothingType");

            migrationBuilder.DropTable(
                name: "Color");

            migrationBuilder.DropTable(
                name: "Fit");

            migrationBuilder.DropTable(
                name: "Outfits");
        }
    }
}
