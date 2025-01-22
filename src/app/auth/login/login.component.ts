import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'app/component/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private_web_address: string = '';
  email: string = '';
  password: string = '';
  error_msg: string = '';
  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpClient,
    @Inject('APP_CONFIG') private config: any
  ) {
  }

  check() {
    console.log(this.private_web_address, this.email, this.password);
    if (this.password == '') {
      return;
    }
    this.login(this.private_web_address, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Mock saving user data or token
        switch (response.error) {
          case 0:
            localStorage.setItem('user', JSON.stringify(response.token));
            localStorage.setItem('private_web_address', response.user?.private_web_address);
            localStorage.setItem('user_id', response.user?._id);
            localStorage.setItem('user_email', response.user?.email);
            localStorage.setItem('user_outlet', response.user?.outlet?._id);
            localStorage.setItem('user_register', response.user?.register);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.token));

            this.config.private_web_address = response.user?.private_web_address;
            this.config.user_email = response.user?.email;
            this.config.userinfo = response.user;
            this.config.outlet_id = response.user?.outlet?._id;
            this.config.register_id = response.user?.register;
            this.config.user_id = response.user?._id;

            this.router.navigate(['/dashboard']);
            break;
          case 'email_verify':
            this.toastService.showToast('Email unverified!', 'error', 3000);

            // this.error_msg = 'Email unverified';
            break;
          case 'password':
            this.toastService.showToast('Wrong password!', 'error', 3000);

            // this.error_msg = 'Wrong password';
            break;
          case 'private_web_address':
            this.toastService.showToast('Incorrect private web address!', 'error', 3000);

            // this.error_msg = 'Wrong private web address';
            break;
          case 'permission':
            this.toastService.showToast('Not allowed to access!', 'error', 3000);

            // this.error_msg = 'Not allowed to access';
            break;
          default:
            this.toastService.showToast('Incorrect Information!', 'error', 3000);

            // this.error_msg = 'Incorrect information';
            break;
        }
        console.log('error:', response.error);

      },
      error: (err) => {
        // this.error_msg = 'Incorrect information';
        this.toastService.showToast('Incorrect information!', 'error', 3000);

        console.error('Login failed', err);
        // this.error_msg = err;

        // this.toastService.showToast('Filtered Successfully!', 'success', 3000);
        // this.toastService.showToast('This is a success message!', 'success', 3000);
        // this.toastService.showToast('This is a info message!', 'info', 3000);
        // this.toastService.showToast('This is a warning message!', 'warning', 3000);
        // this.toastService.showToast(err, 'error', 3000);
        // alert('Invalid email or password');
      },
    });
  }

  login(private_web_address: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/auth/login`, {
      status: 'Admin',
      private_web_address, 
      password
    });
  }
}
