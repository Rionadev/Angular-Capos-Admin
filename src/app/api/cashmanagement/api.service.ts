import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register } from 'module';

@Injectable({
  providedIn: 'root'
})
export class CashManagement {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  // GET request
  getCashList(params: any): Observable<any> {
    // Prepare query parameters
    params = {
      ...params,
      private_web_address: this.config.private_web_address,

    }
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });

    // Make the API call
    return this.http.get(this.config.apiUrl + "/cash/cashmanagementdata", { params: queryParams });
  }

  createCash(params: any): Observable<any> {
    // Make the API call
    params = {
      ...params,
      register: this.config.register_id,
      user_id: this.config.user_id,
      outlet: this.config.outlet_id,
      private_web_address: this.config.private_web_address,
    }
    return this.http.post(this.config.apiUrl + "/cash/cashmanagementdata", params);
  }
  updateCash(params: any): Observable<any> {
    // Make the API call
    params = {
      ...params,
      register: this.config.register_id,
      user_id: this.config.user_id,
      outlet: this.config.outlet_id,
      private_web_address: this.config.private_web_address,
    }
    return this.http.put(this.config.apiUrl + "/cash/cashmanagementdata", params);
  }
  deleteCash(id: string): Observable<any> {
    // Make the API call
    const params = new HttpParams().set('id', id);
    return this.http.delete(this.config.apiUrl + "/cash/cashmanagementdata", { params });
  }
}
