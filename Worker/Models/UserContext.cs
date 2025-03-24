using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

/*
 * Sebastian Tran
 * Database schema for user data
 * Extends IdentityDBContext to add extra tables
 */

namespace Worker.Models
{
    public class UserContext : IdentityDbContext <User>
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
    }
}
