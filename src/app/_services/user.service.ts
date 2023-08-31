import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9000/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

 
  requestRide(pickup: string, destination: string) {
    let request = { pickupLocation: pickup, dropoffLocation: destination };
    console.log(request);
    return this.http.post(API_URL + 'ride-requests/1/create-ride', request);
  }
}
