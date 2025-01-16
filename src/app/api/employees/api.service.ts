import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(@Inject('APP_CONFIG') private config: any, private http: HttpClient) {}

  // GET request
  getUsers(params: {
    role?: string;
    outlet?: string;
    domain_name?: string;
    user_id?: string;
    name?: string;
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
    return this.http.get(`${this.config.apiUrl}/auth/users`, { params: queryParams });
  }

  create(params: any): Observable<any> {
    // Make the API call
    const queryParams = {
      ...params, // Spread existing parameters
      private_web_address: this.config.private_web_address, // Add the additional property
    };
    return this.http.post(`${this.config.apiUrl}/auth/user`, queryParams);
  }

  update(params: any): Observable<any> {
    return this.http.put(`${this.config.apiUrl}/auth/user`, params);
  }

  delete(params: any): Observable<any> {
    // Make the API call
    return this.http.delete(`${this.config.apiUrl}/auth/user`, {params: params});
  }
  /* / POST request
  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  // PUT request
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  // DELETE request
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  } */
}
