import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnyARecord } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class GroupsService {

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
    return this.http.get(`${this.config.apiUrl}/customers/group`, {params: queryParams});
  }

  update(params: {
    limit?: number;
    _id?: string;
    private_web_address?: string;
    name?: string;
    point_rates?: any[];
    created_at?: string;
    updated_at?: string;
    __v?: number;
  }): Observable<any> {
    // Prepare query parameters
    /* let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    }); */
    // Make the API call
    return this.http.put(`${this.config.apiUrl}/customers/group`, params);
  }
}
