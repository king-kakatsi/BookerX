using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookerXBackend.Migrations
{
    /// <inheritdoc />
    public partial class bookupdatedwithimageUrlandbookUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BookUrl",
                table: "Books",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Books",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookUrl",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Books");
        }
    }
}
