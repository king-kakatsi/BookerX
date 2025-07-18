using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using BookerXBackend.Controllers;
using BookerXBackend.Models;
using BookerXBackend.Models.Entities;




/// <summary>
/// **BookControllerTests**
/// Unit tests for BookController. Ensures all CRUD operations, authorization, and business logic are covered.
/// </summary>
public class BookControllerTests
{

// %%%%%% GET ALL BOOKS TEST %%%%%%%%%%%%
    /// <summary>
    /// **GetAllBooks_ReturnsListOfBooks**
    /// Tests that GetBooks returns a list of books.
    /// No parameters.
    /// Returns: OkObjectResult with list of books.
    /// Example: var result = await controller.GetBooks();
    /// </summary>
    [Fact]
    public async Task GetAllBooks_ReturnsListOfBooks()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetAllBooksDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 1 });
            context.Books.Add(new Book { Id = 2, Name = "Book2", Category = "Cat2", Price = 20, AuthorId = 2 });
            context.SaveChanges();
            var controller = new BookController(context);
            var result = await controller.GetBooks();
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var books = Assert.IsAssignableFrom<IEnumerable<Book>>(okResult.Value);
            Assert.Equal(2, ((List<Book>)books).Count);
        }
    }
// %%%%%% END - GET ALL BOOKS TEST %%%%%%%%%%%%





// %%%%%% GET BOOK BY ID TEST %%%%%%%%%%%%
    /// <summary>
    /// **GetBookById_ReturnsBook_WhenBookExists**
    /// Tests that GetBook returns a book when it exists.
    /// Parameter: int id - Book ID to search.
    /// Returns: OkObjectResult with book.
    /// Example: var result = await controller.GetBook(1);
    /// </summary>
    [Fact]
    public async Task GetBookById_ReturnsBook_WhenBookExists()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetBookByIdDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 1 });
            context.SaveChanges();
            var controller = new BookController(context);
            var result = await controller.GetBook(1);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var book = Assert.IsType<Book>(okResult.Value);
            Assert.Equal(1, book.Id);
        }
    }
// %%%%%% END - GET BOOK BY ID TEST %%%%%%%%%%%%





// %%%%%% GET BOOK BY ID NOT FOUND TEST %%%%%%%%%%%%
    /// <summary>
    /// **GetBookById_ReturnsNotFound_WhenBookDoesNotExist**
    /// Tests that GetBook returns NotFound when the book does not exist.
    /// Parameter: int id - Book ID to search.
    /// Returns: NotFoundResult.
    /// Example: var result = await controller.GetBook(999);
    /// </summary>
    [Fact]
    public async Task GetBookById_ReturnsNotFound_WhenBookDoesNotExist()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetBookByIdNotFoundDb").Options;
        using (var context = new AppDbContext(options))
        {
            var controller = new BookController(context);
            var result = await controller.GetBook(999);
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
// %%%%%% END - GET BOOK BY ID NOT FOUND TEST %%%%%%%%%%%%





// %%%%%% CREATE BOOK TEST %%%%%%%%%%%%
    /// <summary>
    /// **CreateBook_ReturnsCreatedBook**
    /// Tests that CreateBook creates a new book and returns it.
    /// Parameter: BookDto bookDto - Book data to create.
    /// Returns: CreatedAtActionResult with created book.
    /// Example: var result = await controller.CreateBook(bookDto);
    /// </summary>
    [Fact]
    public async Task CreateBook_ReturnsCreatedBook()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "CreateBookDb").Options;
        using (var context = new AppDbContext(options))
        {
            var controller = new BookController(context);
            var bookDto = new BookDto { Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 1 };
            var result = await controller.CreateBook(bookDto);
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var book = Assert.IsType<Book>(createdResult.Value);
            Assert.Equal("Book1", book.Name);
        }
    }
// %%%%%% END - CREATE BOOK TEST %%%%%%%%%%%%





// %%%%%% UPDATE BOOK TEST %%%%%%%%%%%%
    /// <summary>
    /// **UpdateBook_ReturnsOk_WhenBookUpdated**
    /// Tests that UpdateBook updates an existing book.
    /// Parameters: int id - Book ID, BookDto bookDto - Updated data.
    /// Returns: OkObjectResult.
    /// Example: var result = await controller.UpdateBook(1, bookDto);
    /// </summary>
    [Fact]
    public async Task UpdateBook_ReturnsOk_WhenBookUpdated()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "UpdateBookDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 1 });
            context.SaveChanges();
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.Admin.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var bookDto = new BookDto { Name = "Updated", Category = "Cat1", Price = 20, AuthorId = 1 };
            var result = await controller.UpdateBook(1, bookDto);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Book updated successfully.", ((dynamic)okResult.Value).message);
        }
    }
// %%%%%% END - UPDATE BOOK TEST %%%%%%%%%%%%





// %%%%%% UPDATE BOOK NOT FOUND TEST %%%%%%%%%%%%
    /// <summary>
    /// **UpdateBook_ReturnsNotFound_WhenBookDoesNotExist**
    /// Tests that UpdateBook returns NotFound when the book does not exist.
    /// Parameters: int id - Book ID, BookDto bookDto - Updated data.
    /// Returns: NotFoundResult.
    /// Example: var result = await controller.UpdateBook(999, bookDto);
    /// </summary>
    [Fact]
    public async Task UpdateBook_ReturnsNotFound_WhenBookDoesNotExist()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "UpdateBookNotFoundDb").Options;
        using (var context = new AppDbContext(options))
        {
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.Admin.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var bookDto = new BookDto { Name = "Updated", Category = "Cat1", Price = 20, AuthorId = 1 };
            var result = await controller.UpdateBook(999, bookDto);
            Assert.IsType<NotFoundResult>(result);
        }
    }
// %%%%%% END - UPDATE BOOK NOT FOUND TEST %%%%%%%%%%%%





// %%%%%% UPDATE BOOK FORBID TEST %%%%%%%%%%%%
    /// <summary>
    /// **UpdateBook_ReturnsForbid_WhenUserNotAllowed**
    /// Tests that UpdateBook returns Forbid when a non-admin tries to update a book they do not own.
    /// Parameters: int id - Book ID, BookDto bookDto - Updated data.
    /// Returns: ForbidResult.
    /// Example: var result = await controller.UpdateBook(1, bookDto);
    /// </summary>
    [Fact]
    public async Task UpdateBook_ReturnsForbid_WhenUserNotAllowed()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "UpdateBookForbidDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 2 });
            context.SaveChanges();
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.User.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var bookDto = new BookDto { Name = "Updated", Category = "Cat1", Price = 20, AuthorId = 1 };
            var result = await controller.UpdateBook(1, bookDto);
            Assert.IsType<ForbidResult>(result);
        }
    }
// %%%%%% END - UPDATE BOOK FORBID TEST %%%%%%%%%%%%





// %%%%%% DELETE BOOK TEST %%%%%%%%%%%%
    /// <summary>
    /// **DeleteBook_ReturnsOk_WhenBookDeleted**
    /// Tests that DeleteBook deletes an existing book.
    /// Parameter: int id - Book ID to delete.
    /// Returns: OkObjectResult.
    /// Example: var result = await controller.DeleteBook(1);
    /// </summary>
    [Fact]
    public async Task DeleteBook_ReturnsOk_WhenBookDeleted()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "DeleteBookDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 1 });
            context.SaveChanges();
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.Admin.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var result = await controller.DeleteBook(1);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Book deleted successfully.", ((dynamic)okResult.Value).message);
        }
    }
// %%%%%% END - DELETE BOOK TEST %%%%%%%%%%%%





// %%%%%% DELETE BOOK NOT FOUND TEST %%%%%%%%%%%%
    /// <summary>
    /// **DeleteBook_ReturnsNotFound_WhenBookDoesNotExist**
    /// Tests that DeleteBook returns NotFound when the book does not exist.
    /// Parameter: int id - Book ID to delete.
    /// Returns: NotFoundResult.
    /// Example: var result = await controller.DeleteBook(999);
    /// </summary>
    [Fact]
    public async Task DeleteBook_ReturnsNotFound_WhenBookDoesNotExist()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "DeleteBookNotFoundDb").Options;
        using (var context = new AppDbContext(options))
        {
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.Admin.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var result = await controller.DeleteBook(999);
            Assert.IsType<NotFoundResult>(result);
        }
    }
// %%%%%% END - DELETE BOOK NOT FOUND TEST %%%%%%%%%%%%





// %%%%%% DELETE BOOK FORBID TEST %%%%%%%%%%%%
    /// <summary>
    /// **DeleteBook_ReturnsForbid_WhenUserNotAllowed**
    /// Tests that DeleteBook returns Forbid when a non-admin tries to delete a book they do not own.
    /// Parameter: int id - Book ID to delete.
    /// Returns: ForbidResult.
    /// Example: var result = await controller.DeleteBook(1);
    /// </summary>
    [Fact]
    public async Task DeleteBook_ReturnsForbid_WhenUserNotAllowed()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "DeleteBookForbidDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 2 });
            context.SaveChanges();
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.User.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var result = await controller.DeleteBook(1);
            Assert.IsType<ForbidResult>(result);
        }
    }
// %%%%%% END - DELETE BOOK FORBID TEST %%%%%%%%%%%%





// %%%%%% GET MY BOOKS TEST %%%%%%%%%%%%
    /// <summary>
    /// **GetMyBooks_ReturnsBooksForCurrentUser**
    /// Tests that GetMyBooks returns only books owned by the current user.
    /// No parameters (uses JWT claims).
    /// Returns: OkObjectResult with list of books.
    /// Example: var result = await controller.GetMyBooks();
    /// </summary>
    [Fact]
    public async Task GetMyBooks_ReturnsBooksForCurrentUser()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "GetMyBooksDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Books.Add(new Book { Id = 1, Name = "Book1", Category = "Cat1", Price = 10, AuthorId = 1 });
            context.Books.Add(new Book { Id = 2, Name = "Book2", Category = "Cat2", Price = 20, AuthorId = 2 });
            context.SaveChanges();
            var controller = new BookController(context);
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1"),
                new Claim(ClaimTypes.Role, UserRole.User.ToString())
            }, "mock"));
            controller.ControllerContext = new ControllerContext { HttpContext = new DefaultHttpContext { User = user } };
            var result = await controller.GetMyBooks();
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var books = Assert.IsAssignableFrom<IEnumerable<Book>>(okResult.Value);
            Assert.Single(books);
            Assert.Equal(1, ((List<Book>)books)[0].AuthorId);
        }
    }
// %%%%%% END - GET MY BOOKS TEST %%%%%%%%%%%%

}
