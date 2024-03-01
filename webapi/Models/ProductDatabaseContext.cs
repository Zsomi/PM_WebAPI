using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class ProductDatabaseContext : DbContext
    {
        public ProductDatabaseContext(DbContextOptions<ProductDatabaseContext> options) : base(options) {

        }

        public DbSet<Product> Products { get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer("Data Source=.; inital Catalog=lbs; User Id=root; password= ; TrustServerCertificate= True");
        }
    }
}
