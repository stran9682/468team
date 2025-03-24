using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Worker.Models;
using Worker.Services;

/*
 *  Sebastian Tran
 *  Controller with CRUD operations for handling user data
 *  Ex: Registering and logging in, and getting specific user data
 */

namespace Worker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDataController : ControllerBase
    {
        public UserContext _UserContext;
        public UserManager<User> _UserManager;
        public JwtService _JwtService;

        /*  
         *  Constructor to inject services
         *  - UserContext contains DB tables related to users
         *  - UserManager provides methods for managing user data safely
         *  - JWTService for creating JWTs whenever a user logs in
         */
        public UserDataController(UserContext userContext, UserManager<User> userManager, JwtService jwtService)
        {
            _UserContext = userContext;
            _UserManager = userManager;
            _JwtService = jwtService;
        }

        /*
         *  HTTP Endpoint for registering users
         *  - Takes in a User DTO for safety
         */
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDTO user)
        {
            // Check if user DTO contains necessary information
            if (user is null || user.UserName is null || user.Password is null || user.Email is null)
            {
                return BadRequest("Invalid user data");
            }

            // Ensure no duplicate usernames using UserManager
            var existingUsername = await _UserManager.FindByEmailAsync(user.Email);
            if (existingUsername != null)
            {
                return BadRequest("Email already exists");
            }

            // Ensure no duplicate emails using UserManager
            var existingEmail = await _UserManager.FindByNameAsync(user.UserName);
            if (existingEmail != null)
            {
                return BadRequest("Username already exists");
            }

            // Create a new user using data from User DTO
            var newUser = new User
            {
                UserName = user.UserName,
                Email = user.Email,
            };

            // Add new user to database
            var result = await _UserManager.CreateAsync(newUser, user.Password);
            return Ok(result);
        }

        /*
         *  HTTP Endpoint for logging in users
         *  - Takes in a User DTO for safety
         */
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserDTO user)
        {
            // Check if user DTO contains necessary information (username and password)
            if (user is null || user.UserName is null || user.Password is null)
            {
                return BadRequest("Invalid user data");
            }

            // Test if username is in database
            var existingUser = await _UserManager.FindByNameAsync(user.UserName);
            if (existingUser == null)
            {
                return BadRequest("User does not exist");
            }

            // Test if password is correct
            var result = await _UserManager.CheckPasswordAsync(existingUser, user.Password);
            if (!result)
            {
                return BadRequest("Invalid password");
            }

            // Use JWT service to generate a JWT 
            var token = _JwtService.GenerateToken(user);
            return Ok(new { Token = token });
        }


        /*
         *  HTTP Endpoint for getting user outfits
         *  - Requires authorization first using JWT produced by login
         */
        [Authorize]
        [HttpGet("useroutfits")]
        public IActionResult GetUserOutfits()
        {
            return Ok(new { Message = "This is a protected API endpoint!" });   //placeholder 
        }
    }
}
