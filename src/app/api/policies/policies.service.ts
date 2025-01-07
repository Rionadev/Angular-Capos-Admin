import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PoliciesService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) {}

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
    return this.http.get(`${this.config.apiUrl}/sale/store_policy`, {params: queryParams});
  }

  update(params: any): Observable<any> {
    // Prepare query parameters
    /* let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    }); */
    // Make the API call
    return this.http.put(`${this.config.apiUrl}/sale/store_policy`, params);
  }
}
