using System.Security.Cryptography;
using System.Text;

namespace BookerXBackend.Services
{
    /// <summary>
    /// Provides password hashing and verification using PBKDF2 (recommended for .NET).
    /// </summary>
    public static class PasswordHasher
    {
        // %%%%%%%%%%%%%%%%% PROPRIETIES %%%%%%%%%%%%%%%%%%%
        private const int SaltSize = 16; // 128 bit
        private const int KeySize = 32;  // 256 bit
        private const int Iterations = 10000;
        private static readonly HashAlgorithmName HashAlgorithm = HashAlgorithmName.SHA256;
        // %%%%%%%%%%%%%%%%% END - PROPRIETIES %%%%%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%%%%%%% HASH PASSWORD %%%%%%%%%%%%%%%%%%%%%%%
        /// <summary>
        /// Hashes a password with a random salt using PBKDF2.
        /// </summary>
        /// <param name="password">The plain text password.</param>
        /// <returns>Base64 string containing salt + hash.</returns>
        public static string Hash(string password)
        {
            // Generate a random salt
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            // Derive the key (hash)
            byte[] key = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithm, KeySize);
            // Combine salt + key
            var hashBytes = new byte[SaltSize + KeySize];
            Buffer.BlockCopy(salt, 0, hashBytes, 0, SaltSize);
            Buffer.BlockCopy(key, 0, hashBytes, SaltSize, KeySize);
            // Return as base64
            return Convert.ToBase64String(hashBytes);
        }
        // %%%%%%%%%%%%%%%%%%%%% END - HASH PASSWORD %%%%%%%%%%%%%%%%%%%%%%%




        // %%%%%%%%%%%%%%%%%% VERIFY PASSWORD %%%%%%%%%%%%%%%%%
        /// <summary>
        /// Verifies a password against a hash (salt+hash format).
        /// </summary>
        /// <param name="password">The plain text password.</param>
        /// <param name="hash">The stored hash (base64 salt+hash).</param>
        /// <returns>True if password is valid, false otherwise.</returns>
        public static bool Verify(string password, string hash)
        {
            var hashBytes = Convert.FromBase64String(hash);
            // Extract salt
            var salt = new byte[SaltSize];
            Buffer.BlockCopy(hashBytes, 0, salt, 0, SaltSize);
            // Extract key
            var key = new byte[KeySize];
            Buffer.BlockCopy(hashBytes, SaltSize, key, 0, KeySize);
            // Hash input password with extracted salt
            var attemptedKey = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithm, KeySize);
            // Compare
            return CryptographicOperations.FixedTimeEquals(key, attemptedKey);
        }
        // %%%%%%%%%%%%%%%%%% END - VERIFY PASSWORD %%%%%%%%%%%%%%%%%
    }
} 