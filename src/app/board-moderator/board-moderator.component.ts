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
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
  
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }
  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.userService.getModeratorBoard().subscribe({
  //     next: data => {
  //       this.content = data;
  //     },
  //     error: err => {
  //       if (err.error) {
  //         try {
  //           const res = JSON.parse(err.error);
  //           this.content = res.message;
  //         } catch {
  //           this.content = `Error with status: ${err.status} - ${err.statusText}`;
  //         }
  //       } else {
  //         this.content = `Error with status: ${err.status}`;
  //       }
  //     }
  //   });
  // }
}
