import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';

@Component({
  selector: 'app-pages-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.css'],
})
export class PagesLayoutComponent {
  private role: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.roleType;

      this.showAdminBoard = this.role === 'SUPERUSER';
      this.showModeratorBoard = this.role === 'DRIVER';
      this.showUserBoard = this.role === 'CUSTOMER';

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.isLoginFailed = true;
        this.isLoggedIn = false;
        this.storageService.clean();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // logout(): void {
  //   this.authService.logout().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.storageService.clean();

  //       window.location.reload();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
