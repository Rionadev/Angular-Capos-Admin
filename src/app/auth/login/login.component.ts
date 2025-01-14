import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private_web_address: string = '';
  email: string = '';
  password: string = '';
  constructor(private router: Router, private http: HttpClient, @Inject('APP_CONFIG') private config: any) { }

  check() {

    console.log(this.private_web_address, this.email, this.password);
    this.login(this.private_web_address, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Mock saving user data or token
        switch (response.error) {
          case 0:
            localStorage.setItem('user', JSON.stringify(response.token));
            localStorage.setItem('username', this.private_web_address);

            this.router.navigate(['/dashboard']);
            break;
          case 'email_verify':
            break;
          case 'password':
            break;
          case 'private_web_address':
            break;
          case 'permission':
            break;
          default:
            break;
        }

      },
      error: (err) => {
        console.error('Login failed', err);
        // alert('Invalid email or password');
      },
    });
  }

  login(private_web_address: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/auth/login`, { status: 'Admin', private_web_address, email, password });
  }
}
