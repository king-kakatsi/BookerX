using Xunit;
using BookerXBackend.Services;



/// <summary>
/// **PasswordHasherTests**
/// Unit tests for PasswordHasher. Ensures hashing and verification logic are covered.
/// </summary>
public class PasswordHasherTests
{

// %%%%%% HASH AND VERIFY SUCCESS TEST %%%%%%%%%%%%
    /// <summary>
    /// **HashAndVerify_ReturnsTrue_WhenPasswordMatches**
    /// Tests that a password hashed and then verified returns true.
    /// No parameters.
    /// Returns: True if password matches.
    /// Example: var result = PasswordHasher.Verify(password, hash);
    /// </summary>
    [Fact]
    public void HashAndVerify_ReturnsTrue_WhenPasswordMatches()
    {
        var password = "MySecretPassword!";
        var hash = PasswordHasher.Hash(password);
        var result = PasswordHasher.Verify(password, hash);
        Assert.True(result);
    }
// %%%%%% END - HASH AND VERIFY SUCCESS TEST %%%%%%%%%%%%





// %%%%%% HASH AND VERIFY FAIL TEST %%%%%%%%%%%%
    /// <summary>
    /// **HashAndVerify_ReturnsFalse_WhenPasswordDoesNotMatch**
    /// Tests that a password hashed and then verified with a wrong password returns false.
    /// No parameters.
    /// Returns: False if password does not match.
    /// Example: var result = PasswordHasher.Verify(wrongPassword, hash);
    /// </summary>
    [Fact]
    public void HashAndVerify_ReturnsFalse_WhenPasswordDoesNotMatch()
    {
        var password = "MySecretPassword!";
        var wrongPassword = "WrongPassword";
        var hash = PasswordHasher.Hash(password);
        var result = PasswordHasher.Verify(wrongPassword, hash);
        Assert.False(result);
    }
// %%%%%% END - HASH AND VERIFY FAIL TEST %%%%%%%%%%%%

}
 