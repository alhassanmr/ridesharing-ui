import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9000/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  requestRide(pickup: string, destination: string, userId: string) {
    let request = { pickupLocation: pickup, dropoffLocation: destination };
    console.log(request);
    return this.http.post(
      API_URL + `ride-requests/${userId}/create-ride`,
      request
    );
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(API_URL + `users/${userId}`);
  }

  toggleUserStatus(userId: number, isActive: boolean): Observable<any> {
    const url = `${API_URL}users/${userId}/status`;
    return this.http.put(url, { is_active: isActive });
  }

  getActiveDrivers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}drivers/activealldrivers`);
  }

  getAllDrivers(): Observable<any> {
    return this.http.get(API_URL + `drivers`);
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(API_URL + `customers`);
  }

  getUserRides(userId: string): Observable<any> {
    return this.http.get(API_URL + `ride-requests/customer/${userId}/ride`);
  }

  getDriverRides(driverId: number): Observable<any[]> {
    return this.http.get<any[]>(API_URL + `drivers/${driverId}/rides`);
  }

  confirmDriverRide(rideId: number) {
    return this.http.post(
      API_URL + `ride-requests/driver/${rideId}/confirm`,
      {}
    );
  }

  confirmRideStatus(rideId: number): Observable<any> {
    return this.http.post(
      API_URL + `ride-requests/customer/${rideId}/confirm`,
      {}
    );
  }
}
