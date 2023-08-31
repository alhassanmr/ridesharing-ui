import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, PagesLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
