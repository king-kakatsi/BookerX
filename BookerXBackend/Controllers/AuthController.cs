using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookerXBackend.Models;
using BookerXBackend.Models.Entities;
using BookerXBackend.Services;

namespace BookerXBackend.Controllers
{
    // %%%%%%%%%%%%%%%%% AUTH CONTROLLER %%%%%%%%%%%%%%%%%%%
    /// <summary>
    /// Handles user registration and login (JWT authentication).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // %%%%%%%%%%%%%%%%% PROPERTIES %%%%%%%%%%%%%%%%%%%
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        // %%%%%%%%%%%%%%%%% END - PROPERTIES %%%%%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%%%%% CONSTRUCTOR %%%%%%%%%%%%%%%%%%%%
        /// <summary>
        /// Constructor with DI for context and config.
        /// </summary>
        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        // %%%%%%%%%%%%%%%%%%% END - CONSTRUCTOR %%%%%%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% REGISTER %%%%%%%%%%%%%%%%
        /// <summary>
        /// Registers a new user (role: User by default).
        /// </summary>
        /// <param name="dto">Registration data (name, email, password)</param>
        /// <returns>Success or error message.</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Check if email is taken
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email already exists." });
            }

            // Hash password
            var passwordHash = PasswordHasher.Hash(dto.Password);

            // Create user
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = passwordHash,
                Role = UserRole.User // Default role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }
        // %%%%%%%%%%%%%%%% END - REGISTER %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% LOGIN %%%%%%%%%%%%%%%%
        /// <summary>
        /// Authenticates a user and returns a JWT token.
        /// </summary>
        /// <param name="dto">Login data (email, password)</param>
        /// <returns>JWT token or error message.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !PasswordHasher.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            // Generate JWT
            var token = GenerateJwtToken(user);
            return Ok(new { token, name = user.Name, email = user.Email });
        }
        // %%%%%%%%%%%%%%%% END - LOGIN %%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%% JWT GENERATION (PRIVATE) %%%%%%%%%%%%%%%%
        /// <summary>
        /// Generates a JWT token for the authenticated user.
        /// </summary>
        /// <param name="user">The authenticated user.</param>
        /// <returns>JWT token string.</returns>
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(6),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        // %%%%%%%%%%%%%%%% END - JWT GENERATION (PRIVATE) %%%%%%%%%%%%%%%%
    }
    // %%%%%%%%%%%%%%%%% END - AUTH CONTROLLER %%%%%%%%%%%%%%%%%%%
} 