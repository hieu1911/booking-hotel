import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

import { UserService } from '../../services/user.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationObject } from 'src/app/services/reservation.service';
import { User } from '../../models/user';
import { Reservation } from 'src/app/models/reservation';

declare var bootstrap: any;

interface ReservationObj {
  photo: string;
  hotelName: string;
  roomName: string;
  price: number;
  address: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
  @Input() auth: boolean = false;
  
  noLogin: boolean = true;
  showSettings: boolean = false;
  showNotifications: boolean = false;

  user$: Observable<User>
  user!: User;
  userPop: any;

  reservation$: Observable<ReservationObject[]>;
  reservations: ReservationObj[] = new Array<ReservationObj>();

  constructor(private userService: UserService, private reservationService: ReservationService) {
    this.user$ = this.userService.userObservable$;
    this.reservation$ = this.reservationService.reservationObservable$;
  }

  ngOnInit(): void {
    const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    this.user$.subscribe(user => {
      if (user.username !== '') {
        this.user = user;
        this.noLogin = false;
      } else {
        this.noLogin = true;
      }
    });

    
    if (this.user) {
      this.reservationService.getReservation(this.user._id);
    }

    this.reservation$.subscribe(result => {
      this.reservations = []
      result.forEach(reservation => {
        this.reservations.push({
          photo: reservation.hotel.photos[0],
          hotelName: reservation.hotel.name,
          roomName: reservation.room.title,
          price: reservation.roomOptions.price,
          address: reservation.hotel.address,
          startDate: new Date(reservation.reservation.startDate).toDateString(),
          endDate: new Date(reservation.reservation.endDate).toDateString()
        })
      })
    })
  }

  signOut(): void {
    this.noLogin = true;
    this.userService.setUserToLocalStorage(new User('', '', '', ''));
  }

}
