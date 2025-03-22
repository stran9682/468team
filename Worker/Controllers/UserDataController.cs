using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Worker.Models;

namespace Worker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDataController : ControllerBase
    {
        public UserContext _UserContext;

        public UserDataController(UserContext userContext)
        {
            _UserContext = userContext;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetOutfits()
        {

        }


    }
}
