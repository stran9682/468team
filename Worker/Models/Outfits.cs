namespace Worker.Models
{
    public class Outfits
    {
        public int Id { get; set; }

        public List <ClothingItem> Items { get; set; } = new List<ClothingItem> ();
        public User? User { get; set; }
    }
}
