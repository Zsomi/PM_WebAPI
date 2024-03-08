using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase {

        private readonly ProductDatabaseContext _productDatabaseContext;

        public ProductController(ProductDatabaseContext ProductDatabaseContext) {
            _productDatabaseContext = ProductDatabaseContext;
        }

        [HttpGet]
        [Route("GetProduct/{id}")]
        public async Task<Product> GetProductById(int id)
        {
            return await _productDatabaseContext.Product.FindAsync(id);
        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<IEnumerable<Product>> GetProducts() {
            return await _productDatabaseContext.Product.ToListAsync();
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<Product> AddProduct(Product objProduct) {
            _productDatabaseContext.Product.Add(objProduct);
            await _productDatabaseContext.SaveChangesAsync();
            return objProduct;
        }

        [HttpPatch]
        [Route("UpdateProduct/{id}")]
        public async Task<Product> UpdateProduct(Product objProduct) {
            _productDatabaseContext.Entry(objProduct).State = EntityState.Modified;
            await _productDatabaseContext.SaveChangesAsync();
            return objProduct;
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public bool DeleteProduct(int id)
        {
            bool deletionSuccessful = false;
            var product = _productDatabaseContext.Product.Find(id);

            if (product != null)
            {
                deletionSuccessful = true;
                _productDatabaseContext.Product.Remove(product);
                _productDatabaseContext.SaveChanges();
            }
            else
            {
                deletionSuccessful = false;
            }

            return deletionSuccessful;
        }
    }
}
