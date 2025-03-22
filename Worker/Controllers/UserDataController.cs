using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Worker.Models;
using Worker.Services;

namespace Worker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDataController : ControllerBase
    {
        public UserContext _UserContext;
        public UserManager<User> _UserManager;
        public JwtService _JwtService;

        public UserDataController(UserContext userContext, UserManager<User> userManager, JwtService jwtService)
        {
            _UserContext = userContext;
            _UserManager = userManager;
            _JwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserDTO user)
        {
            if (user is null || user.UserName is null || user.Password is null || user.Email is null)
            {
                return BadRequest("Invalid user data");
            }

            var existingUsername = await _UserManager.FindByEmailAsync(user.Email);
            if (existingUsername != null)
            {
                return BadRequest("Email already exists");
            }

            var existingEmail = await _UserManager.FindByNameAsync(user.UserName);
            if (existingEmail != null)
            {
                return BadRequest("Username already exists");
            }

            var newUser = new User
            {
                UserName = user.UserName,
                Email = user.Email,
            };

            var result = await _UserManager.CreateAsync(newUser, user.Password);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserDTO user)
        {
            if (user is null || user.UserName is null || user.Password is null)
            {
                return BadRequest("Invalid user data");
            }

            var existingUser = await _UserManager.FindByNameAsync(user.UserName);
            if (existingUser == null)
            {
                return BadRequest("User does not exist");
            }

            var result = await _UserManager.CheckPasswordAsync(existingUser, user.Password);
            if (!result)
            {
                return BadRequest("Invalid password");
            }

            var token = _JwtService.GenerateToken(user);
            return Ok(new { Token = token });
        }
    }
}
