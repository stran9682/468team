/*
 * Model for clothing color
 * For storing the color of garment with matching clothes
 * Ex: Black, White, Red
 */

using System.Text.Json.Serialization;

namespace Worker.Models
{
    public class Color
    {
        public int Id { get; set; }
        public string? ClothingColor { get; set; }

        [JsonIgnore]
        public List<ClothingItem>? MatchingColoredItems { get; set; }
    }
}
