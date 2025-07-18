using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using BookerXBackend.Controllers;
using BookerXBackend.Models;
using BookerXBackend.Models.Entities;
using BookerXBackend.Services;



/// <summary>
/// **AuthControllerTests**
/// Unit tests for AuthController. Ensures registration, login, and JWT logic are covered.
/// </summary>
public class AuthControllerTests
{


// %%%%%% REGISTER SUCCESS TEST %%%%%%%%%%%%
    /// <summary>
    /// **Register_ReturnsOk_WhenUserIsNew**
    /// Tests that Register returns Ok when a new user is registered.
    /// Parameter: RegisterDto dto - Registration data.
    /// Returns: OkObjectResult.
    /// Example: var result = await controller.Register(dto);
    /// </summary>
    [Fact]
    public async Task Register_ReturnsOk_WhenUserIsNew()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "RegisterOkDb").Options;
        using (var context = new AppDbContext(options))
        {
            var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string>()).Build();
            var controller = new AuthController(context, config);
            var dto = new RegisterDto { Name = "Test", Email = "test@email.com", Password = "pass" };
            var result = await controller.Register(dto);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User registered successfully.", ((dynamic)okResult.Value).message);
        }
    }
// %%%%%% END - REGISTER SUCCESS TEST %%%%%%%%%%%%





// %%%%%% REGISTER EMAIL EXISTS TEST %%%%%%%%%%%%
    /// <summary>
    /// **Register_ReturnsBadRequest_WhenEmailExists**
    /// Tests that Register returns BadRequest when email already exists.
    /// Parameter: RegisterDto dto - Registration data.
    /// Returns: BadRequestObjectResult.
    /// Example: var result = await controller.Register(dto);
    /// </summary>
    [Fact]
    public async Task Register_ReturnsBadRequest_WhenEmailExists()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "RegisterEmailExistsDb").Options;
        using (var context = new AppDbContext(options))
        {
            context.Users.Add(new User { Name = "Test", Email = "test@email.com", PasswordHash = "hash", Role = UserRole.User });
            context.SaveChanges();
            var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string>()).Build();
            var controller = new AuthController(context, config);
            var dto = new RegisterDto { Name = "Test", Email = "test@email.com", Password = "pass" };
            var result = await controller.Register(dto);
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
// %%%%%% END - REGISTER EMAIL EXISTS TEST %%%%%%%%%%%%





// %%%%%% LOGIN SUCCESS TEST %%%%%%%%%%%%
    /// <summary>
    /// **Login_ReturnsOk_WithToken_WhenCredentialsValid**
    /// Tests that Login returns Ok with JWT token when credentials are valid.
    /// Parameter: LoginDto dto - Login data.
    /// Returns: OkObjectResult with token.
    /// Example: var result = await controller.Login(dto);
    /// </summary>
    [Fact]
    public async Task Login_ReturnsOk_WithToken_WhenCredentialsValid()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "LoginOkDb").Options;
        using (var context = new AppDbContext(options))
        {
            var password = "pass";
            var hash = PasswordHasher.Hash(password);
            context.Users.Add(new User { Name = "Test", Email = "test@email.com", PasswordHash = hash, Role = UserRole.User });
            context.SaveChanges();
            var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string>
            {
                { "Jwt:Key", "supersecretkey1234567890123456" },
                { "Jwt:Issuer", "testissuer" },
                { "Jwt:Audience", "testaudience" }
            }).Build();
            var controller = new AuthController(context, config);
            var dto = new LoginDto { Email = "test@email.com", Password = password };
            var result = await controller.Login(dto);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(((dynamic)okResult.Value).token);
        }
    }
// %%%%%% END - LOGIN SUCCESS TEST %%%%%%%%%%%%





// %%%%%% LOGIN INVALID CREDENTIALS TEST %%%%%%%%%%%%
    /// <summary>
    /// **Login_ReturnsUnauthorized_WhenCredentialsInvalid**
    /// Tests that Login returns Unauthorized when credentials are invalid.
    /// Parameter: LoginDto dto - Login data.
    /// Returns: UnauthorizedObjectResult.
    /// Example: var result = await controller.Login(dto);
    /// </summary>
    [Fact]
    public async Task Login_ReturnsUnauthorized_WhenCredentialsInvalid()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "LoginInvalidDb").Options;
        using (var context = new AppDbContext(options))
        {
            var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string>
            {
                { "Jwt:Key", "supersecretkey1234567890123456" },
                { "Jwt:Issuer", "testissuer" },
                { "Jwt:Audience", "testaudience" }
            }).Build();
            var controller = new AuthController(context, config);
            var dto = new LoginDto { Email = "wrong@email.com", Password = "wrong" };
            var result = await controller.Login(dto);
            Assert.IsType<UnauthorizedObjectResult>(result);
        }
    }
// %%%%%% END - LOGIN INVALID CREDENTIALS TEST %%%%%%%%%%%%

}
 