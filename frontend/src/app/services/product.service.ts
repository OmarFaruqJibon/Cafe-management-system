import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  addProduct(data: any) {
    return this.http.post(
      `${this.url}/product/add-product/`,
      data,
      this.jsonHeader
    );
  }

  updateProduct(data: any) {
    return this.http.patch(
      `${this.url}/product/update-product/`,
      data,
      this.jsonHeader
    );
  }

  getProducts() {
    return this.http.get(`${this.url}/product/get-products`);
  }

  deleteProduct(id: any) {
    return this.http.delete(
      `${this.url}/product/delete-product/${id}`,
      this.jsonHeader
    );
  }

  getProductsByCategory(id: any) {
    return this.http.get(`${this.url}/product/get-by-category/${id}`);
  }

  getById(id: any) {
    return this.http.get(`${this.url}/product/getByID/${id}`);
  }
}
