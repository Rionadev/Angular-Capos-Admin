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
    private_web_address?: string;
    domain_name?: string;
    user_id?: string;
  }): Observable<any> {
    // Prepare query parameters
    let queryParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams = queryParams.set(key, params[key]!);
      }
    });

    // Make the API call
    return this.http.get(this.config.apiUrl + "/auth/users", { params: queryParams });
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
