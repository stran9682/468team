/*
 * Model for clothing type
 * For storing the type of garment with matching clothes
 * Ex: Pants, Jackets, Shirts
 */

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Worker.Models
{
    public class ClothingType
    {
        public int Id { get; set; }

        public string ClothingItemType { get; set; } = "other";

        [JsonIgnore]
        public List<ClothingItem> MatchingTypeItems { get; set; } = new List<ClothingItem>();
    }
}
