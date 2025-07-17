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

        /// <summary>
        /// URL of the book's cover image (optional).
        /// </summary>
        public string? ImageUrl { get; set; }

        /// <summary>
        /// URL of the book's PDF or resource (optional).
        /// </summary>
        public string? BookUrl { get; set; }

        /// <summary>
        /// Search helper property. Concatenates all book fields into a single string for easy search/filtering.
        /// Includes: Name, Category, Price, Description, AuthorId, and Id.
        /// </summary>
        public string SearchHelper => $"{Name} {Category} {Price} {Description} {AuthorId} {Id}";
        
    }
} 