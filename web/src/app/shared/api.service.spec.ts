import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product', () => {
    const testData = {
      productName: "Asus Laptop",
      productPrice: 250
    };

    service.addProduct(testData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apihost}AddProduct`);
    expect(req.request.method).toBe('POST');
    req.flush(testData);
  });

  it('should delete a product', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apihost}DeleteProduct/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(10);
  });

  it('should update a product', () => {
    const testData = {
      productId: 7,
      productName: "GH4541",
      productPrice: 451
    };

    service.updateProduct(testData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apihost}UpdateProduct/${testData.productId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(testData);
  });

  it('should get products', () => {
    const mockProducts = [
      { productId: 1, productName: 'Termék 1', productPrice: 19.99 },
      { productId: 2, productName: 'Termék 1', productPrice: 19.99 },
    ];
    service.getProducts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apihost}GetProduct`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
