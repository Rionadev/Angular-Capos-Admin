import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  read(params: {
    domain_name?: string;
    range?: string;
    _id?: string;
    start?: string;
    end?: string;
    keyword?: string;
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
    return this.http.get(`${this.config.apiUrl}/sale/sale`, {params: queryParams});
  }
}
