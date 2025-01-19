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
  fecthRegister() {
    let httpParams = new HttpParams();
    let params: any = {
      private_web_address: this.config.private_web_address,
      // status: 2
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
  fetchPaymentReg(param: any) {
    let httpParams = new HttpParams();
    console.log(param);
    let params: any = {
      private_web_address: this.config.private_web_address,
      status: 2
    };
    if (param.register) {
      if (param.register != 'all') {
        params = {
          ...params,
          ...param
        };
      }
    }
    // Build HttpParams from the provided params object
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get(`${this.config.apiUrl}/sell/openclose`,
      { params }
    );
  }
  fetchSaleTaxReport(): Observable<any> {
    let httpParams = new HttpParams();
    const params = {
      private_web_address: this.config.private_web_address
    };
    // Build HttpParams from the provided params object
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    // Log the constructed HttpParams to verify
    console.log('Constructed HttpParams:', httpParams.toString());

    // Make the API call
    return this.http.get(`${this.config.apiUrl}/sale/saletax`, { params: httpParams });
  }
}