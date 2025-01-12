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
}