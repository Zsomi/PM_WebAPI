import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    let endpoint = 'AddProduct';
    let url = environment.apihost + endpoint;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let httpOption = {
      headers: headers
    };
    return this.http.post<any>(url, data, httpOption);
  }

  deleteProduct(productId: number) {
    let endpoint = 'DeleteProduct';
    let url = environment.apihost + endpoint + "/" + productId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let httpOption = {
      headers: headers
    };
    return this.http.delete<any>(url, httpOption);
  }

  updateProduct(product: any) {
    let id = product.productId;
    let endpoint = 'UpdateProduct';
    let url = environment.apihost + endpoint + "/" + id;  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let httpOption = {
      headers: headers
    };
    return this.http.patch(url, product, httpOption);
  }

  getProducts() {
    let endpoint = 'GetProduct';
    let url = environment.apihost + endpoint;
    return this.http.get<any>(url);
  }
}
