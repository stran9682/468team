/*
 * Injectible service for generating JWTs
 */

using System.Text;
using Worker.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Worker.Services
{
    public class JwtService
    {
        private readonly string _key;

        public JwtService(IConfiguration configuration)
        {
            _key = configuration["JwtSettings:Secret"]!;
        }

        /*
         * DEAR GOD WHY IS THIS SO HARD
         * MAKE SURE AT ALL COSTS THAT THE USERNAME AND EMAIL ARE NOT NULL :)
         */

        public string GenerateToken (UserDTO user)
        {
            if (user.UserName is null || user.Email is null)
            {
                throw new ArgumentException("UserName and Email must not be null");
            }   

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
