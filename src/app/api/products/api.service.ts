import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  // readCustomer(params: any): Observable<any> {
  getAllCustomers(
  ): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/customers/getAllSearchCustoms`);
  }
  getAllOutlets(
  ): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/sell/getoutletitems`);
  }
  getAllCustomersGroups(
  ): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/customers/getAllSearchCustoms`);
  }
}