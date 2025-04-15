using System.Text.Json.Serialization;

namespace Worker.Models
{
    public class Outfit
    {
        public int Id { get; set; }

        public List <ClothingItem> Items { get; set; } = new List<ClothingItem> ();

        [JsonIgnore]
        public User? User { get; set; }
    }
}
