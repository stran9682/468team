/*
 * Model for a clothing item
 * For storing a clothing item with its properties
 * Ex: Oversized T-shirt, Slim Fit pants
 */

namespace Worker.Models
{
    public class ClothingItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }     
        public double? Price { get; set; }
        public string? Image { get; set; }
        public string? Link { get; set; }

        public ClothingType? Type { get; set; }
        public Fit? Style { get; set; }
        public List<Color>? Colors { get; set; }
    }
}
