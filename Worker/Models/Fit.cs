/*
 * Model for clothing fit
 * For storing the style of garment with matching clothes
 * Ex: Loose fit, Regular Fit, Slim Fit
 */

using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Worker.Models
{
    public class Fit
    {
        public int Id { get; set; }

        public string ClothingFit { get; set; } = "other";

        [JsonIgnore]
        public List<ClothingItem> MatchingFitItems { get; set; } = new List<ClothingItem>();
    }
}
