import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StoresService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) {}

  read(params: {
    domain_name?: string;
  }): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });
    queryParams = queryParams.set("private_web_address", this.config.private_web_address);
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/auth/store`, {params: queryParams});
  }

  update(params: {
    social_link?: any;
    physical_address?: any;
    postal_address?: any;
    paypal?: any;
    stripe?: any;
    plan?: any;
    preferences?: any;
    active_widget?: any;
    domain_name?: string;
    profile_image?: string;
    logo?: string;
    default_tax?: string;
    user_switch_security?: number;
    active?: boolean;
    store_pickup?: boolean;
    short_description?: string;
    fcm_token?: string;
    uber_store_id?: string;
    theme_color?: string;
    customer_point_gift?: any;
    gift_rate?: number;
    dealer_rate?: number;
    _id?: string;
    private_web_address?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    default_currency?: any;
    sliders?: any;
    banners?: any;
    services?: any;
    created_at?: string;
    __v?: number;
    click_collect?: boolean;
    phone?: string;
    sequence_number?: number;
    store_name?: string;
    template?: string;
    website?: string;
  }): Observable<any> {
    // Prepare query parameters
    // let queryParams = new HttpParams();
    // Object.keys(params).forEach((key) => {
    //   if (params[key]) {
    //     queryParams = queryParams.set(key, params[key]!);
    //   }
    // });
    // Make the API call
    // console.log("queryParams", queryParams);
    // return this.http.put(`${this.config.apiUrl}/auth/store`, queryParams);
    return this.http.put(`${this.config.apiUrl}/auth/store`, params);
  }
}
