namespace BookerXBackend.Models
{
    /// <summary>
    /// Data Transfer Object for user login.
    /// </summary>
    public class LoginDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
} 