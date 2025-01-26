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
  ): Observable<any> {
    const param = {
      ...params,
      field: 'all-factor',
      private_web_address: this.config.private_web_address,
    };
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    Object.keys(param).forEach(key => {
      if (param[key] !== undefined && param[key] !== null) {
        httpParams = httpParams.set(key, param[key]);
      }
    });

    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/order`, { params: httpParams });
  }
  fetchOutlet(): Observable<any> {
    let param = {
      private_web_address: this.config.private_web_address,
    };
    let httpParams = new HttpParams();
    Object.keys(param).forEach(key => {
      if (param[key] !== undefined && param[key] !== null) {
        httpParams = httpParams.set(key, param[key]);
      }
    });
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/sell/outlet`, { params: httpParams });
  }
  fetchSupplier(): Observable<any> {
    let param = {
      private_web_address: this.config.private_web_address,
    };
    let httpParams = new HttpParams();
    Object.keys(param).forEach(key => {
      if (param[key] !== undefined && param[key] !== null) {
        httpParams = httpParams.set(key, param[key]);
      }
    });
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/supplier`, { params: httpParams });
  }
  fetchCustomer(): Observable<any> {
    let param = {
      private_web_address: this.config.private_web_address,
    };
    let httpParams = new HttpParams();
    Object.keys(param).forEach(key => {
      if (param[key] !== undefined && param[key] !== null) {
        httpParams = httpParams.set(key, param[key]);
      }
    });
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/customers/customer`, { params: httpParams });
  }
  //orderProduct
  orderProduct(param: any): Observable<any> {
    param.products = param.products.map(({ inventory, ...rest }) => rest);
    param = {
      ...param,
      private_web_address: this.config.private_web_address,

    };

    // Make the API call
    return this.http.post(`${this.config.apiUrl}/product/order`, param);
  }
  updateorderProduct(param: any): Observable<any> {
    param.products = param.products.map(({ inventory, ...rest }) => rest);
    param = {
      ...param,
      private_web_address: this.config.private_web_address,

    };

    // Make the API call
    return this.http.put(`${this.config.apiUrl}/product/order`, param);
  }
  //orderProduct
  updateProductInventory(param: any): Observable<any> {

    // Make the API call
    return this.http.put(`${this.config.apiUrl}/product/inventory`, param);
  }
  fetchProduct(key: string): Observable<any> {
    let param = {
      private_web_address: this.config.private_web_address,
      keyword: key,
      range: 'search',

    };
    let httpParams = new HttpParams();
    Object.keys(param).forEach(key => {
      if (param[key] !== undefined && param[key] !== null) {
        httpParams = httpParams.set(key, param[key]);
      }
    });
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/product`, { params: httpParams });
  }
}