using Microsoft.AspNetCore.Identity;

/*
 * Sebastian Tran
 * Model for representing a user
 * Extends IdentityUser and adds extra data relavant to a user
 */

namespace Worker.Models
{
    public class User : IdentityUser
    {
        public List<Outfits> Outfits { get; set; } = new List<Outfits>();
    }
}
