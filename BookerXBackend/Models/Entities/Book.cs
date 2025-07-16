using System.ComponentModel.DataAnnotations;

namespace BookerXBackend.Models.Entities
{
    /// <summary>
    /// Represents a book in the collection.
    /// </summary>
    public class Book
    {
        /// <summary>
        /// Primary key for the book.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Name of the book.
        /// </summary>
        [Required]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Category or genre of the book.
        /// </summary>
        [Required]
        public string Category { get; set; } = string.Empty;

        /// <summary>
        /// Price of the book.
        /// </summary>
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        /// <summary>
        /// Short description or summary of the book.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Foreign key: the ID of the user (author/owner) who created the book.
        /// </summary>
        [Required]
        public int AuthorId { get; set; }
    }
} 