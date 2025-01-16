import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register } from 'module';

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
  deletesaletransaction(params: any): Observable<any> {
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    return this.http.delete(`${this.config.apiUrl}/sale/sale?_id=${params._id}`);
  }
  //updatesaletransaction
  updatesaletransaction(params: any): Observable<any> {
    // Make the API call
    const param = {
      ...params,
      private_web_address: this.config.private_web_address
    }
    return this.http.put(`${this.config.apiUrl}/sale/sale`,
      param
    );
  }

  fetchProducts(): Observable<any> {
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/product/fetchproduct`,);
  }
  fetchPaymentHistory(params: any): Observable<any> {
    params = {
      ...params,
      private_web_address: this.config.private_web_address
    }
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/sale/fetchpaymenthistory`, { params: httpParams });
  }
  fetchOpenClose(): Observable<any> {
    // Make the API call
    let params = {
      user_id: this.config.user_id,
      outlet: this.config.outlet_id,
      register: this.config.register_id,
      private_web_address: this.config.private_web_address
    }
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(`${this.config.apiUrl}/sell/openclose`, { params });
  }
  fetchTodaySale(): Observable<any> {
    // Make the API call
    let params = {
      user_id: this.config.user_id,
      outlet: this.config.outlet_id,
      register: this.config.register_id,
      private_web_address: this.config.private_web_address
    }
    let httpParams = new HttpParams();

    // Build HttpParams from the provided params object
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(`${this.config.apiUrl}/sale/fetchtodysale`, { params });
  }
  fetchCoutries() {
    return this.http.get(`${this.config.apiUrl}/util/countries`);
  }
  fetchGroup(): Observable<any> {
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/customers/group`,
      this.config.private_web_address
    );
  }
  //deleteGroup
  deleteGroup(params: any): Observable<any> {
    // Make the API call
    return this.http.delete(`${this.config.apiUrl}/customers/group?_id=${params._id}`);
  }
  createGroup(params: any): Observable<any> {
    // Make the API call
    const param = {
      ...params,
      private_web_address: this.config.private_web_address
    }
    console.log('--------------', param);
    return this.http.post(`${this.config.apiUrl}/customers/group`,
      param
    );
  }
  updateGroup(params: any): Observable<any> {
    // Make the API call
    const param = {
      ...params,
      private_web_address: this.config.private_web_address
    }
    console.log('--------------', param);
    return this.http.put(`${this.config.apiUrl}/customers/group`,
      param
    );
  }
  fetchPaymentType(): Observable<any> {
    // Make the API call
    let params = new HttpParams()
      .set('private_web_address', this.config.private_web_address)
    return this.http.get(`${this.config.apiUrl}/customers/paymenttype`,
      { params }
    );
  }

  //customer page
  fetchCumtomerData() {
    let params = new HttpParams()
      .set('range', 'all-factor')
      .set('private_web_address', this.config.private_web_address)
    return this.http.get(`${this.config.apiUrl}/customers/customer`,
      { params }
    );
  }
  delCumtomerData(id: any) {
    console.log(id);
    return this.http.delete(`${this.config.apiUrl}/customers/customer/?_id=${id}`);
  }

  saveCumtomerData(params: any) {
    params = {
      ...params,
      private_web_address: this.config.private_web_address
    }
    if (params._id) {
      return this.http.put(`${this.config.apiUrl}/customers/customer`,
        params
      );
    } else {
      return this.http.post(`${this.config.apiUrl}/customers/customer`,
        params
      );
    }
  }
}