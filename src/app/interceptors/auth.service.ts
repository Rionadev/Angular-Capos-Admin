import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Clone the request and add the token if it exists
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });

      return next.handle(clonedRequest); // Pass the cloned request with the token
    }

    // If no token, send the request as is
    return next.handle(req);
  }
}
