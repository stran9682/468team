using Microsoft.EntityFrameworkCore;

namespace Worker.Models
{
    public class ClothingItemContext : DbContext
    {
        public ClothingItemContext (DbContextOptions<ClothingItemContext> options) : base(options) { }

        public DbSet<ClothingItem> ClothingItems => Set<ClothingItem>();
        public DbSet<Color> ClothingColors => Set<Color>();
        public DbSet<Fit> Fits => Set<Fit>();
        public DbSet<ClothingType> ClothingTypes => Set<ClothingType>();
    }
}
