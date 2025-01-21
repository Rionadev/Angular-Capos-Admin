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
    enabled?: boolean;
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

  create(params: {
    mode?: string,
    data?: string,
  }): Observable<any> {
    const queryParams = {
      ...params, // Spread existing parameters
      private_web_address: this.config.private_web_address, // Add the additional property
    };
    return this.http.post(`${this.config.apiUrl}/product/product`, queryParams);
  }

  update(params): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/product/product`, params);
  }

  delete(params: any): Observable<any> {
    // Make the API call
    return this.http.delete(`${this.config.apiUrl}/product/product`, {params: params});
  }

  getNewBarCode(params: {
  }): Observable<any> {
    const queryParams = {
      ...params, // Spread existing parameters
      private_web_address: this.config.private_web_address, // Add the additional property
    };
    return this.http.get(`${this.config.apiUrl}/product/new_barcode`, {params: queryParams});
  }

}