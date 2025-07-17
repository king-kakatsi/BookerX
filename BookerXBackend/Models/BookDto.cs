using System.ComponentModel.DataAnnotations;

namespace BookerXBackend.Models
{
    /// <summary>
    /// Data Transfer Object for creating or updating a book.
    /// </summary>
    public class BookDto
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public int AuthorId { get; set; }
        public string? ImageUrl { get; set; }
        public string? BookUrl { get; set; }
    }
} 