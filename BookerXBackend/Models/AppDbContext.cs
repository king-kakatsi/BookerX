using Microsoft.EntityFrameworkCore;
using BookerXBackend.Models.Entities;

namespace BookerXBackend.Models
{
    /// <summary>
    /// Database context for the BookerX application.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        /// <summary>
        /// Books table in the database.
        /// </summary>
        public DbSet<Book> Books { get; set; } = null!;


        /// <summary>
        /// Users table in the database.
        /// </summary>
        public DbSet<User> Users { get; set; } = null!;
    }
} 