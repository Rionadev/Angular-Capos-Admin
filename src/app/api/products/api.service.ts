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

  // 
  read(params: {
    range?: string;
    page?: string;
    size?: string;
    sort_field?: string;
    category_slug?: string;
    sort_order?: string;
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

    return this.http.get(`${this.config.apiUrl}/product/product`, {params: queryParams});
  }

}