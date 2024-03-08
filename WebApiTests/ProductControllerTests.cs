using Microsoft.EntityFrameworkCore;
using Moq;
using System.Collections.Generic;
using System.Linq;
using webapi.Controllers;
using webapi.Models;
using Xunit;

namespace WebApiTests
{
    public class ProductControllerTests
    {
        [Fact]
        public async Task GetProducts_ReturnsListOfProducts()
        {
            // Arrange
            var dbContextMock = new Mock<ProductDatabaseContext>();
            var productDbSetMock = new Mock<DbSet<Product>>();
            var controller = new ProductController(dbContextMock.Object);

            var products = new List<Product>
            {
                new Product { ProductId = 1, ProductName = "Product 1" },
                new Product { ProductId = 2, ProductName = "Product 2" }
            };

            dbContextMock.Setup(x => x.Product).Returns(productDbSetMock.Object);
            productDbSetMock.As<IQueryable<Product>>().Setup(m => m.Provider).Returns(products.AsQueryable().Provider);
            productDbSetMock.As<IQueryable<Product>>().Setup(m => m.Expression).Returns(products.AsQueryable().Expression);
            productDbSetMock.As<IQueryable<Product>>().Setup(m => m.ElementType).Returns(products.AsQueryable().ElementType);
            productDbSetMock.As<IQueryable<Product>>().Setup(m => m.GetEnumerator()).Returns(() => products.AsQueryable().GetEnumerator());

            // Act
            var result = await controller.GetProducts();

            // Assert
            Assert.NotNull(result);
            Assert.IsType<List<Product>>(result);

            var resultList = result.ToList();
            Assert.Equal(products.Count, resultList.Count);

            for (int i = 0; i < products.Count; i++)
            {
                Assert.Equal(products[i].ProductId, resultList[i].ProductId);
                Assert.Equal(products[i].ProductName, resultList[i].ProductName);
            }
        }
    }
}
