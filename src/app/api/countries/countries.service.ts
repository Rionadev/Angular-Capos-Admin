import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) { }

  // GET request
  read(params: {
  }): Observable<any> {
    // Make the API call
    return this.http.get(`${this.config.apiUrl}/auth/country`);
  }
}
