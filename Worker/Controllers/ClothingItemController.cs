/*
 * Sebastian Tran
 * Controller with CRUD operations for managing clothing items.
 * Ex: Adding a new clothing item to databse and finding clothing items
 */

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Worker.Models;

namespace Worker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClothingItemController : ControllerBase
    {
        ClothingItemContext _ClothingItemContext;

        /*
         * Constructor to inject services
         * - ClothingItemContext contains DB tables related to clothing items
         */
        public ClothingItemController(ClothingItemContext clothingContext)
        {
            _ClothingItemContext = clothingContext;
        }

        /*
         * HTTP endpoint to add a clothing item
         *  - Takes in a ClothingItem
         *  - ClothingItem can be lax, since EFCore will auto-increment if navigation properties are new and fill in the rest
         *  - Web Scraper is also good at filling in most information, so there shouldn't be cases of empty data
         *    But in case! Post will reutrn a bad request!    
         */
        [HttpPost]
        public async Task<IActionResult> Post ([FromBody] ClothingItem item)
        {

            if (item.Color != null)
            {
                var color = await _ClothingItemContext.ClothingColors.FirstOrDefaultAsync(i => i.ClothingColor == item.Color.ClothingColor);
               
                if (color != null)
                {
                    item.Color = color;
                    color.MatchingColoredItems.Add(item);
                }
            }
            else
            {
                return BadRequest("Add a color");
            }

            if (item.Style != null)
            {
                var fit = await _ClothingItemContext.Fits.FirstOrDefaultAsync(i => i.ClothingFit == item.Style.ClothingFit);

                if (fit != null)
                {
                    item.Style = fit;
                    fit.MatchingFitItems.Add(item);
                }
            }
            else
            {
                return BadRequest("Add a style");
            }

            if (item.Type != null)
            {
                var type = await _ClothingItemContext.ClothingTypes.FirstOrDefaultAsync(i => i.ClothingItemType == item.Type.ClothingItemType);

                if (type != null)
                {
                    item.Type = type;
                    type.MatchingTypeItems.Add(item);
                }
            }
            else
            {
                return BadRequest("Add a type");
            }

            // just in case item is a duplicate!
            if (_ClothingItemContext.ClothingItems.FirstOrDefault(i => i.Link == item.Link) != null)
            {
                return BadRequest("Duplicate item");
            }

            await _ClothingItemContext.ClothingItems.AddAsync(item);
            await _ClothingItemContext.SaveChangesAsync();
            return Ok();
        }

        // TODO Use LINQ magic to get clothing items by color, fit, type.
        [HttpGet]
        public async Task<IActionResult> Get(string? type = null, string? color = null, string? fit = null)
        {
            var query = _ClothingItemContext.ClothingItems
                                                .Include(item => item.Type)
                                                .Include(item => item.Color)
                                                .Include(item => item.Style).AsQueryable();

            if (type != null)
            {
                query = query.Where(item => item.Type != null && item.Type.ClothingItemType == type);
            }

            if (color != null)
            {
                query = query.Where(item => item.Color != null && item.Color.ClothingColor == color);
            }

            if (fit != null)
            {
                query = query.Where(item => item.Style != null && item.Style.ClothingFit == fit);
            }

            return Ok(await query.ToListAsync());
        }

        [HttpGet("getbycolor/{color}")]
        public async Task <IActionResult> GetByColor (string color)
        {
            var item = await _ClothingItemContext.ClothingColors
                                    .Include(item => item.MatchingColoredItems)
                                        .ThenInclude(item => item.Type)
                                    .Include(item => item.MatchingColoredItems)
                                        .ThenInclude(item => item.Style)
                                    .FirstOrDefaultAsync(item => item.ClothingColor == color);
            
            if (item == null)
            {
                return NotFound($"Color {color} not found");
            }

            return Ok(item.MatchingColoredItems);
        }

        [HttpGet("getbytype/{type}")]
        public async Task<IActionResult> GetByType(string type)
        {
            var item = await _ClothingItemContext.ClothingTypes
                                    .Include(item => item.MatchingTypeItems)
                                        .ThenInclude(item => item.Color)
                                    .Include(item => item.MatchingTypeItems)
                                        .ThenInclude(item => item.Style)
                                    .FirstOrDefaultAsync(item => item.ClothingItemType == type);

            if (item == null)
            {
                return NotFound($"Type {type} not found");
            }
            return Ok(item.MatchingTypeItems);
        }

        [HttpGet("getbystyle/{style}")]
        public async Task<IActionResult> GetByStyle(string style)
        {
            var item = await _ClothingItemContext.Fits
                                    .Include(item => item.MatchingFitItems)
                                        .ThenInclude(item => item.Color)
                                    .Include(item => item.MatchingFitItems)
                                        .ThenInclude(item => item.Type)
                                    .FirstOrDefaultAsync(item => item.ClothingFit == style);
            if (item == null)
            {
                return NotFound($"Style {style} not found");
            }
            return Ok(item.MatchingFitItems);
        }

        [HttpGet("getcolors")]
        public async Task<IActionResult> GetColors()
        {
            return Ok(await _ClothingItemContext.ClothingColors.ToListAsync());
        }

        [HttpGet("gettypes")]
        public async Task<IActionResult> GetTypes()
        {
            return Ok(await _ClothingItemContext.ClothingTypes.ToListAsync());
        }

        [HttpGet("getstyles")]
        public async Task<IActionResult> GetStyles()
        {
            return Ok(await _ClothingItemContext.Fits.ToListAsync());
        }
    }
}
