import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    roleType: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: string = '';
  role: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().roleType;
      this.username = this.storageService.getUser().username;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.storageService.getUser().roleType;

        if (data.roleType == 'DRIVER') {
          this.router.navigate(['/mod']);
        } else if (data.roleType == 'CUSTOMER') {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/admin']);
        }
        // this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }
}
