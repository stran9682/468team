/*
 * Model for clothing fit
 * For storing the style of garment with matching clothes
 * Ex: Loose fit, Regular Fit, Slim Fit
 */

using System.Text.Json.Serialization;

namespace Worker.Models
{
    public class Fit
    {
        public int Id { get; set; }
        public string? ClothingFit { get; set; }

        [JsonIgnore]
        public List<ClothingItem>? MatchingFitItems { get; set; }
    }
}
