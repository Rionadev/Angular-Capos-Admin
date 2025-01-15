import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttributesService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  read(params: {
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
    return this.http.get(`${this.config.apiUrl}/product/attribute`, { params: queryParams });    
  }

  // GET request 
  create(params): Observable<any> {
    const queryParams = {
      ...params, // Spread existing parameters
      private_web_address: this.config.private_web_address, // Add the additional property
    };
    // Make the API call
    return this.http.post(`${this.config.apiUrl}/product/attribute`, queryParams);
  }

  update(params): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/product/attribute`, params);
  }

  delete(params): Observable<any> {
    // Make the API call
    return this.http.delete(`${this.config.apiUrl}/product/attribute`, { params: params });
  }

}
