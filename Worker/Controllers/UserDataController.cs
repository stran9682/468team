using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
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
        public ClothingItemContext _UserContext;
        public UserManager<User> _UserManager;
        public JwtService _JwtService;

        /*  
         *  Constructor to inject services
         *  - UserContext contains DB tables related to users
         *  - UserManager provides methods for managing user data safely
         *  - JWTService for creating JWTs whenever a user logs in
         */
        public UserDataController(ClothingItemContext clothingItemContext, UserManager<User> userManager, JwtService jwtService)
        {
            _UserContext = clothingItemContext;
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
        public async Task<IActionResult> GetUserOutfits()
        {
            string tokenString = Request.Headers["Authorization"].ToString().Substring(7);  // get JWT from request
            var token = new JwtSecurityToken(tokenString);                                  // create JWT object 
            string username = token.Claims.First(c => c.Type == "unique_name").Value;       // extract username

            var userOutfits = await _UserContext.Users.Include(u => u.Outfits).ThenInclude(o => o.Items).FirstOrDefaultAsync(u => u.UserName == username);

            if (userOutfits == null)
            {   
                return BadRequest("User outfits is null " + username);
            }

            return Ok(userOutfits.Outfits);   //return user outfits
        }

        /*
         * HTTP Endpoint for adding user outfits
         * - Requires authorization first using JWT produced by login
         */
        [Authorize]
        [HttpPost("useroutfits")]
        public async Task <IActionResult> AddUserOutfit ([FromBody] List<int> clothingItemIds)
        {
            string tokenString = Request.Headers["Authorization"].ToString().Substring(7);  // get JWT from request
            var token = new JwtSecurityToken(tokenString);                                  // create JWT object 
            string username = token.Claims.First(c => c.Type == "unique_name").Value;       // extract username

            var user = await _UserContext.Users.Include(u => u.Outfits).FirstOrDefaultAsync(u => u.UserName == username); // find user associated with JWT

            if (clothingItemIds is not null && clothingItemIds.Count > 0 && user is not null)
            {
                var items = await _UserContext.ClothingItems.Where(t => clothingItemIds.Contains(t.Id)).ToListAsync();

                var dataTransfer = new Outfit
                {
                    Items = items,
                    User = user
                };

                user.Outfits.Add(dataTransfer);
                await _UserContext.SaveChangesAsync();

                return Ok(user.Outfits);
            }
            
            return BadRequest("User outfit creation unsuccessful");
        }
    }
}
