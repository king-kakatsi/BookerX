using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookerXBackend.Models;
using BookerXBackend.Models.Entities;
using System.Security.Claims;

namespace BookerXBackend.Controllers
{
    /// <summary>
    /// API Controller for managing books (CRUD operations).
    /// All endpoints are protected by JWT authentication.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookController : ControllerBase
    {
        // %%%%%%%%%%%%%%%%% PROPERTIES %%%%%%%%%%%%%%%%%%%
        private readonly AppDbContext _context;
        // %%%%%%%%%%%%%%%%% END - PROPERTIES %%%%%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%%%%% CONSTRUCTOR %%%%%%%%%%%%%%%%%%%%
        /// <summary>
        /// Constructor with dependency injection of AppDbContext.
        /// </summary>
        public BookController(AppDbContext context)
        {
            _context = context;
        }
        // %%%%%%%%%%%%%%%%%%% END - CONSTRUCTOR %%%%%%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% GET ALL BOOKS %%%%%%%%%%%%%%%%
        /// <summary>
        /// Get all books in the store.
        /// </summary>
        /// <returns>List of books.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }
        // %%%%%%%%%%%%%%%% END - GET ALL BOOKS %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% GET BOOK BY ID %%%%%%%%%%%%%%%%
        /// <summary>
        /// Get a single book by its ID.
        /// </summary>
        /// <param name="id">Book ID</param>
        /// <returns>The requested book, or NotFound if it doesn't exist.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }
        // %%%%%%%%%%%%%%%% END - GET BOOK BY ID %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% CREATE BOOK %%%%%%%%%%%%%%%%
        /// <summary>
        /// Add a new book to the store.
        /// </summary>
        /// <param name="book">Book object to add</param>
        /// <returns>The created book with its new ID.</returns>
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook([FromBody] Book book)
        {
            // Defensive: ignore client-supplied ID
            book.Id = 0;
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }
        // %%%%%%%%%%%%%%%% END - CREATE BOOK %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% UPDATE BOOK %%%%%%%%%%%%%%%%
        /// <summary>
        /// Update an existing book by its ID.
        /// </summary>
        /// <param name="id">Book ID</param>
        /// <param name="book">Updated book object</param>
        /// <returns>Success message if updated, NotFound or Forbid if not allowed.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            if (id != book.Id)
            {
                return BadRequest("Book ID mismatch.");
            }

            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            // Get userId and role from JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
            bool isAdmin = roleClaim == UserRole.Admin.ToString();
            if (userIdClaim == null || (!isAdmin && existingBook.AuthorId != int.Parse(userIdClaim)))
            {
                return Forbid();
            }

            // Update properties
            existingBook.Name = book.Name;
            existingBook.Category = book.Category;
            existingBook.Price = book.Price;
            existingBook.Description = book.Description;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Book updated successfully." });
        }
        // %%%%%%%%%%%%%%%% END - UPDATE BOOK %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% DELETE BOOK %%%%%%%%%%%%%%%%
        /// <summary>
        /// Delete a book by its ID.
        /// </summary>
        /// <param name="id">Book ID</param>
        /// <returns>Success message if deleted, NotFound or Forbid if not allowed.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            // Get userId and role from JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
            bool isAdmin = roleClaim == UserRole.Admin.ToString();
            if (userIdClaim == null || (!isAdmin && book.AuthorId != int.Parse(userIdClaim)))
            {
                return Forbid();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Book deleted successfully." });
        }
        // %%%%%%%%%%%%%%%% END - DELETE BOOK %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% GET MY BOOKS %%%%%%%%%%%%%%%%
        /// <summary>
        /// Get all books created by the currently authenticated user.
        /// </summary>
        /// <returns>List of books owned by the user.</returns>
        [HttpGet("mine")]
        public async Task<ActionResult<IEnumerable<Book>>> GetMyBooks()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim);
            var books = await _context.Books.Where(b => b.AuthorId == userId).ToListAsync();
            return Ok(books);
        }
        // %%%%%%%%%%%%%%%% END - GET MY BOOKS %%%%%%%%%%%%%%%%
    }
} 