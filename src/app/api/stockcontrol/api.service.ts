import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  // readCustomer(params: any): Observable<any> {
  readOrderProduct(
    params
    // : {    
    // }
  ): Observable<any> {
    const param = {
      ...params,
      field: 'all-factor',
      private_web_address: this.config.private_web_address
    };
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    Object.keys(param).forEach(key => {
      if (param[key] !== undefined && param[key] !== null) {
        httpParams = httpParams.set(key, param[key]);
      }
    });
    // let httpParams = new HttpParams();
    // Object.keys(params).forEach(key => {
    //   if (params[key]) {
    //     httpParams = httpParams.set(key, params[key]);
    //   }
    // });

    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/order`, { params: httpParams });
  }
}