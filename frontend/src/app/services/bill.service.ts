import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  url: string = environment.serverUrl;
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private http: HttpClient) {}

  generateReport(data: any) {
    return this.http.post(
      `${this.url}/bill/generate-report`,
      data,
      this.jsonHeader
    );
  }

  getPDF(data: any): Observable<Blob> {
    return this.http.post(`${this.url}/bill/get-pdf`, data, {
      responseType: 'blob',
    });
  }

  getBills() {
    return this.http.get(`${this.url}/bill/get-bills`);
  }

  delete(id: any) {
    return this.http.delete(`${this.url}/bill/delete/${id}`, this.jsonHeader);
  }
}
