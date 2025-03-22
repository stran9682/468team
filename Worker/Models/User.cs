using Microsoft.AspNetCore.Identity;

namespace Worker.Models
{
    public class User : IdentityUser
    {
        public List<Outfits> Outfits { get; set; } = new List<Outfits>();
    }
}
