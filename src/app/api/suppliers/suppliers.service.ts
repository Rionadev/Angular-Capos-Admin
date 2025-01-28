import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SuppliersService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  // GET request
  create(params: {
    name?: string;
  }): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });
    queryParams = queryParams.set("private_web_address", this.config.private_web_address);
    // Make the API call
    return this.http.post(`${this.config.apiUrl}/product/supplier`, queryParams);
  }

  read(params: {
    _id?: string;
    domain_name?: string;
  }): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });
    queryParams = queryParams.set("private_web_address", this.config.private_web_address);
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/supplier`, { params: queryParams });
  }
  getAllSuppliers(): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    queryParams = queryParams.set("private_web_address", this.config.private_web_address);
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/supplier`, { params: queryParams });
  }
  createSupplier(params): Observable<any> {
    params = {
      ...params,
      private_web_address: this.config.private_web_address,
    }
    // Make the API call
    return this.http.post(`${this.config.apiUrl}/product/supplier`, params);
  }
  updateSupplier(params): Observable<any> {
    params = {
      ...params,
    }
    // Make the API call
    return this.http.put(`${this.config.apiUrl}/product/supplier`, params);
  }
  deleteSupplier(params: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set("_id", params);
    // Make the API call
    return this.http.delete(`${this.config.apiUrl}/product/supplier`, { params: queryParams });
  }
}
