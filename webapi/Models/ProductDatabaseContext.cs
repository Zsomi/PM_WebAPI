using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class ProductDatabaseContext : DbContext
    {
        public ProductDatabaseContext(DbContextOptions<ProductDatabaseContext> options) : base(options) {

        }

        public DbSet<Product> Product { get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseMySql(
                "Server=localhost;Database=products;User=root;Password=;",
                new MySqlServerVersion(new Version(10, 4, 28)));
        }
    }
}
