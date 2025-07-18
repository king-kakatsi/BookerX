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
        [HttpGet("{id:int}")]
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
        /// <param name="bookDto">BookDto object to add</param>
        /// <returns>The created book with its new ID.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Book>> CreateBook([FromBody] BookDto bookDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            var book = new Book
            {
                Name = bookDto.Name,
                Category = bookDto.Category,
                Price = bookDto.Price,
                Description = bookDto.Description,
                AuthorId = int.Parse(userIdClaim), // Sécurisé : toujours l'utilisateur connecté
                ImageUrl = bookDto.ImageUrl,
                BookUrl = bookDto.BookUrl
            };
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
        /// <param name="bookDto">Updated BookDto object</param>
        /// <returns>Success message if updated, NotFound or Forbid if not allowed.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto)
        {
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
            existingBook.Name = bookDto.Name;
            existingBook.Category = bookDto.Category;
            existingBook.Price = bookDto.Price;
            existingBook.Description = bookDto.Description;
            existingBook.ImageUrl = bookDto.ImageUrl;
            existingBook.BookUrl = bookDto.BookUrl;

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
        [Authorize]
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
        [Authorize]
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




        // %%%%%%%%%%%%%%%% BUY BOOK %%%%%%%%%%%%%%%%
        /// <summary>
        /// Allows the current user to buy a book (adds bookId to PurchasedBookIds).
        /// </summary>
        /// <param name="bookId">ID of the book to buy</param>
        /// <returns>Success or already bought message</returns>
        [HttpPost("buy")]
        [Authorize]
        public async Task<IActionResult> BuyBook([FromBody] BuyBookRequest request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();
            int userId = int.Parse(userIdClaim);
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized();
            if (user.PurchasedBookIds.Contains(request.BookId))
                return Ok(new { message = "Already bought" });
            user.PurchasedBookIds.Add(request.BookId);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Book successfully bought!" });
        }
        // %%%%%%%%%%%%%%%% END - BUY BOOK %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% GET PURCHASED BOOK IDS %%%%%%%%%%%%%%%%
        /// <summary>
        /// Returns the list of book IDs purchased by the current user.
        /// </summary>
        [HttpGet("purchased")]
        [Authorize]
        public async Task<IActionResult> GetPurchasedBookIds()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();
            int userId = int.Parse(userIdClaim);
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized();
            return Ok(user.PurchasedBookIds);
        }
        // %%%%%%%%%%%%%%%% END - GET PURCHASED BOOK IDS %%%%%%%%%%%%%%%%
    }
} 