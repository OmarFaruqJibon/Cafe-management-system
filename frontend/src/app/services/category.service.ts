import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  addCategory(data: any) {
    return this.http.post(this.url + '/category/add-category/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateCategory(data: any) {
    return this.http.patch(this.url + '/category/update-category/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getCategory() {
    return this.http.get(this.url + '/category/get-category');
  }
}
