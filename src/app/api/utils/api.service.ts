import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }
  //customer page
  fetchSalesData(paramas: any) {
    let params = new HttpParams()
      .set('range', 'all-factor')
      .set('private_web_address', this.config.private_web_address)
    // return this.http.get(`${this.config.apiUrl}/sale/sale`,
    //   { params }
    // );
  }
  //get members of registers
  getRegisters() {
    let httpParams = new HttpParams();
    let params: any = {
      private_web_address: this.config.private_web_address,
    };
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(`${this.config.apiUrl}/sell/register`,
      { params }
    );
  }
  //get members of registers
  getCustomers() {
    let httpParams = new HttpParams();
    let params: any = {
      private_web_address: this.config.private_web_address,
    };
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(`${this.config.apiUrl}/customers/customer`,
      { params }
    );
  }
  //get members of registers
  getUsers() {
    let httpParams = new HttpParams();
    let params: any = {
      private_web_address: this.config.private_web_address,
    };
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(`${this.config.apiUrl}/auth/users`,
      { params }
    );
  }
}