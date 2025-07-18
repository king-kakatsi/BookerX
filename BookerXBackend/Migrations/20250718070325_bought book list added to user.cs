using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookerXBackend.Migrations
{
    /// <inheritdoc />
    public partial class boughtbooklistaddedtouser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PurchasedBookIds",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PurchasedBookIds",
                table: "Users");
        }
    }
}
