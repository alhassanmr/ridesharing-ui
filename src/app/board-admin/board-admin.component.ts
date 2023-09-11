import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    roleType: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  drivers: any[] = [];
  customers: any[] = []; // Array to store the list of customers

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchAllDrivers();
    this.fetchAllCustomers();
  }

  fetchAllDrivers() {
    this.userService.getAllDrivers().subscribe((drivers) => {
      this.drivers = drivers.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
      );
    });
  }

  // Function to fetch all customers
  fetchAllCustomers() {
    this.userService.getAllCustomers().subscribe((customers) => {
      this.customers = customers.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
      );
    });
  }

  onSubmit(): void {
    const { username, email, password, roleType } = this.form;

    this.authService
      .registerAdmin(username, email, password, roleType)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.fetchAllDrivers();
          this.fetchAllCustomers();
          window.location.reload();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
