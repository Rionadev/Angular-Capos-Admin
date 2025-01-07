import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  // readCustomer(params: any): Observable<any> {
  readCustomer(
    //   params: {    
    // }
  ): Observable<any> {

    // let httpParams = new HttpParams();
    // Object.keys(params).forEach(key => {
    //   if (params[key]) {
    //     httpParams = httpParams.set(key, params[key]);
    //   }
    // });

    // Make the API call
    return this.http.get(`${this.config.apiUrl}/customers/getAllSearchCustoms`);
  }
  fetchSaleHistory(params: any): Observable<any> {
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    // Log the constructed HttpParams to verify
    console.log('Constructed HttpParams:', httpParams.toString());

    // Make the API call
    return this.http.get(`${this.config.apiUrl}/sale/sales_ledger`, { params: httpParams });
  }
}