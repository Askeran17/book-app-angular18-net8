using Microsoft.EntityFrameworkCore;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Quote> Quotes { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}