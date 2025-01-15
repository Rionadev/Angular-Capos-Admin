import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) {}

  // GET request
  create(params): Observable<any> {
    const queryParams = {
      ...params, // Spread existing parameters
      private_web_address: this.config.private_web_address, // Add the additional property
      user: this.config.userinfo?._id
    };
    // Make the API call
    return this.http.post(`${this.config.apiUrl}/sale/blog`, queryParams);
  }

  read(params): Observable<any> {
    const queryParams = {
      ...params, // Spread existing parameters
      private_web_address: this.config.private_web_address, // Add the additional property
    };
    return this.http.get(`${this.config.apiUrl}/sale/blog`, {params: queryParams});
  }

  update(params): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/sale/blog`, params);
  }

  delete(params): Observable<any> {
    return this.http.delete(`${this.config.apiUrl}/sale/blog`, {params: params});
  }

}
