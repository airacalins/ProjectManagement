namespace API.Entities
{
    public class Photo
    {
        public Guid Id { get; set; }
        public string Url { get; set; } = default!;
       public string PublicId { get; set; } = default!;
        
    }
}