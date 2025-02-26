/*
 * Model for clothing type
 * For storing the type of garment with matching clothes
 * Ex: Pants, Jackets, Shirts
 */

using System.Text.Json.Serialization;

namespace Worker.Models
{
    public class ClothingType
    {
        public int Id { get; set; }
        public string? Type { get; set; }

        [JsonIgnore]
        public List<ClothingItem>? MatchingTypeItems { get; set; }
    }
}
