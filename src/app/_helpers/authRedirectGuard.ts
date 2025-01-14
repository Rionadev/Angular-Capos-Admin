import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('user'); // Check if the user is logged in
    if (isAuthenticated) {
      this.router.navigate(['/dashboard']); // Redirect logged-in users to the dashboard
      return false; // Prevent access to the login page
    }
    return true; // Allow access to login page for not logged-in users
  }
}
