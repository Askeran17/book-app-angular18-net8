namespace MyApp.Data
{
    public class Quote
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public string Author { get; set; } = null!;
    }
}