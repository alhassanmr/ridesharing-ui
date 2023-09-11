import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css'],
})
export class BoardModeratorComponent implements OnInit {
  currentUser: any;
  driverDetails: any;
  isDriverAvailable: boolean = false;
  driverRides: any[] = [];

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  toggleDriverStatus() {
    this.isDriverAvailable = !this.isDriverAvailable;
    // Update status in backend
    this.userService
      .toggleUserStatus(this.currentUser.id, this.isDriverAvailable)
      .subscribe({
        next: (response) => {
          this.isDriverAvailable = response.is_active;
          console.log('Status updated successfully', response);
          window.alert('Status updated successfully');
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating status', error);
          window.alert('Error updating status' + error.message);
          // Reset local status if update failed
          this.isDriverAvailable = !this.isDriverAvailable;
        },
      });
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    // Fetch the rides assigned to the driver
    this.userService.getDriverRides(this.currentUser.id).subscribe({
      next: (rides) => {
        this.driverRides = rides;
      },
      error: (error) => {
        console.error('Error fetching assigned rides', error);
      },
    });

    // Fetch the driver details
    this.userService.getUserDetails(this.currentUser.id).subscribe({
      next: (details) => {
        this.driverDetails = details;
        // Add a new marker based on the received driverDetails
        if (details.latitude && details.longitude) {
          const newMarker = {
            lat: parseFloat(details.latitude),
            lng: parseFloat(details.longitude),
          };
          this.markerPositions.push(newMarker);
          // Update the center and zoom level
          this.center = newMarker;
          this.zoom = 16;
          // Update isDriverAvailable based on details received
          this.isDriverAvailable = details.active;
        }
      },
      error: (error) => {
        console.error('Error fetching driver details', error);
        window.alert('Error fetching driver details: ' + error.message);
      },
    });
  }

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 13;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  confirmRide(rideId: number) {
    this.userService.confirmDriverRide(rideId).subscribe({
      next: (response) => {
        console.log('Ride confirmed successfully', response);
        window.alert('Ride confirmed successfully');
        // Reload the current page after confirming the ride
        window.location.reload();
      },
      error: (error) => {
        console.error('Error confirming ride', error);
        window.alert('Error confirming ride: ' + error.message);
      },
    });
  }
}
