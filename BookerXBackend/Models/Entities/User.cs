using System.ComponentModel.DataAnnotations;

namespace BookerXBackend.Models.Entities
{
    /// <summary>
    /// Represents an application user for authentication.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Primary key for the user.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Unique username for login.
        /// </summary>
        [Required]
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Hashed password (never store plain text passwords).
        /// </summary>
        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        /// <summary>
        /// User role (User or Admin).
        /// </summary>
        [Required]
        public UserRole Role { get; set; } = UserRole.User;
    }
} 