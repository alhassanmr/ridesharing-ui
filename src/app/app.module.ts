import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, PagesLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
