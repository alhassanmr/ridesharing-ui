import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { ViewChild, ElementRef } from '@angular/core';

interface CustomMarker {
  lat: number;
  lng: number;
  draggable: boolean;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class BoardUserComponent implements OnInit, AfterViewInit {
  zoom = 14;
  markers: CustomMarker[] = [];
  map?: google.maps.Map;
  display: google.maps.LatLngLiteral | undefined;
  center: google.maps.LatLngLiteral = {
    lat: 5.6813748,
    lng: -0.1721644,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  currentUser: any;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getActiveDrivers().subscribe((drivers) => {
      this.markers = drivers.map((driver, index) => {
        return {
          lat: parseFloat(driver.latitude),
          lng: parseFloat(driver.longitude),
          draggable: false,
          label: `Driver ${index + 1}`,
        };
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    });
  }

  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: this.center,
        zoom: this.zoom,
      }
    );
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.markers.push({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        draggable: true,
        label: this.markers.length === 0 ? 'Pickup' : 'Destination',
      });
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  moveMarker(newPosition: google.maps.LatLngLiteral, index: number) {
    this.markers[index].lat = newPosition.lat;
    this.markers[index].lng = newPosition.lng;
  }

  requestRide() {
    console.log('pickup: ' + JSON.stringify(this.markers[0]));
    console.log('dropoff: ' + JSON.stringify(this.markers[1]));
    if (this.markers.length < 2) {
      alert('Please select pickup location and dropoff location');
    } else {
      this.userService
        .requestRide(
          JSON.stringify(this.markers[0]),
          JSON.stringify(this.markers[1]),
          this.currentUser.id
        )
        .subscribe(
          (res) => {
            console.log('api response: ' + JSON.stringify(res));
            alert('Ride created.');
            console.log('api response: ' + JSON.stringify(res));
          },
          (error: HttpErrorResponse) => {
            console.error('An error occurred:', error);
            let errorMessage = 'An error occurred';

            if (error.status === 404) {
              errorMessage = 'Driver not found';
            } else if (error.status === 400) {
              errorMessage = 'Bad request';
            }
            alert(errorMessage);
          }
        );
    }
  }
}
