using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Worker.Models;

namespace Worker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClothingItemController : ControllerBase
    {
        ClothingItemContext _ClothingItemContext;

        public ClothingItemController(ClothingItemContext clothingContext)
        {
            _ClothingItemContext = clothingContext;
        }

        // TODO Fill database with clothing items.
        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] ClothingItem item)
        {
            await _ClothingItemContext.ClothingItems.AddAsync(item);
            await _ClothingItemContext.SaveChangesAsync();
            return Ok();
        }

        // TODO Use LINQ magic to get clothing items by color, fit, type
        [HttpGet]
        public IActionResult Get(string? type = null, string? color = null, string? fit = null)
        {
            var query = _ClothingItemContext.ClothingItems.AsQueryable();

            if (type != null)
            {
                query = query.Where(item => item.Type != null && item.Type.Type == type);
            }

            if (color != null)
            {
                query = query.Where(item => item.Color != null && item.Color.ClothingColor == color);
            }

            if (fit != null)
            {
                query = query.Where(item => item.Style != null && item.Style.ClothingFit == fit);
            }

            return Ok(query.ToList());
        }
    }
}
