import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-layout.routing';
import { BoardAdminComponent } from 'src/app/board-admin/board-admin.component';
import { BoardModeratorComponent } from 'src/app/board-moderator/board-moderator.component';
import { BoardUserComponent } from 'src/app/board-user/board-user.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
})
export class PagesLayoutModule {}
