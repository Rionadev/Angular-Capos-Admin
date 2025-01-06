import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RolesService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) {}

  // GET request
  create(params: {
    name?: string;
    permissions?: string[];
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
    return this.http.post(`${this.config.apiUrl}/auth/role`, queryParams);
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
    return this.http.get(`${this.config.apiUrl}/auth/role`, {params: queryParams});
  }

  update(params: {
    _id?: string;
    name?: string;
    permissions?: string[];
    private_web_address?: string;
    updated_at?: string;
    _v?: number;
  }): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });
    // Make the API call
    return this.http.put(`${this.config.apiUrl}/auth/role`, queryParams);
  }

  delete(params: {
    _id?: string;
    name?: string;
    permissions?: string[];
    private_web_address?: string;
    updated_at?: string;
    _v?: number;
  }): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });
    // Make the API call
    return this.http.delete(`${this.config.apiUrl}/auth/role`, {params: queryParams});
  }
}
