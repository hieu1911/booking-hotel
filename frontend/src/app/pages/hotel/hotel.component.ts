import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as $ from 'jquery'

import { HotelService } from '../../services/hotel.service';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { ReservationService } from '../../services/reservation.service';
import { RoomObject } from '../../services/room.service';
import { Hotel } from '../../models/hotel'
import { User } from '../../models/user'

interface RoomSelect {
  id: string;
  count: number;
  price: number;
  unavailableDates: {start: Date, end: Date}[];
  disable: boolean;
}

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent {
  user$: Observable<User>
  noLogin: boolean = true;
  user!: User;
  success: boolean = false;
  modalTitle: string = 'Success!';
  modalMessage: string = 'You have successfully booked the room!';

  adults: number = 2;
  children: number = 0;
  rooms: number = 1;
  disableSelectAdults: boolean = this.adults < 1;
  disableSelectChildren: boolean = this.children < 1;
  disableSelectRooms: boolean = this.rooms < 1;
  showOptionsSelector: boolean = false;

  hotelDetail$: Observable<Hotel>;
  hotelDetail: Hotel;
  rooms$: Observable<RoomObject[]>;

  numberRooms: number = 0;
  originPrice: number = 0;
  totalPrice: number = 0;
  roomSelect: Array<RoomSelect> = [];

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor(private router: Router, 
    private hotelService: HotelService, 
    private roomService: RoomService, 
    private userService: UserService,
    private reservationService: ReservationService
    ) {
    window.scroll(0, 0);
    this.user$ = this.userService.userObservable$;
    
    this.hotelDetail = this.hotelService.initHotel;
    this.rooms$ = this.roomService.roomObservable$;

    this.rooms$.subscribe(rooms => {
      this.roomSelect = [];
      let start = this.startDate.value || new Date();
      let end = this.endDate.value || new Date();
      rooms.forEach(room => {
        room.roomOptions.forEach(option => {
          let disable = false;
          option.unavailableDates.map(date => {
            if ((new Date(date.start).getTime() <= end.getTime()) && (new Date(date.end).getTime() >= start.getTime())) {
              disable = true;
            }
          })
          
          this.roomSelect.push({id: option._id, count: 0, price: option.price, unavailableDates: option.unavailableDates, disable: disable});
        })
      })
    })

    this.hotelDetail$ = this.hotelService.hotelDetailObservable$;
    this.hotelDetail$.subscribe(hotel => {
      this.hotelDetail = hotel
      this.roomService.getRoomInHotel(hotel._id);
    });
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user.username !== '') {
        this.user = user;
        this.noLogin = false;
      } else {
        this.noLogin = true;
      }
    })
  }

  getDisable(id: string): boolean {
    let disable = false
    this.roomSelect.forEach(room => {
      if (room.id === id) {
        disable = room.disable;
      }
    })
    return disable;
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  selectChange(event: any) {
    this.numberRooms = 0;
    this.totalPrice = 0;
    this.originPrice = 0;

    this.roomSelect.forEach(room => {
      if (room.id === event.target.id) {
        room.count = parseInt(event.target.value);
      }
      this.numberRooms = this.numberRooms + room.count;
      this.originPrice = this.originPrice + room.count * room.price;
    })
    this.totalPrice = Math.floor((this.originPrice * 95) / 100)
  }

  checkAvailability(id: string): boolean {
    let disable: boolean = true;
    let start = this.startDate.value || new Date();
    let end = this.endDate.value || new Date();

    this.roomSelect.forEach(room => {
      if (room.id === id) {
        room.unavailableDates.forEach(date => {
          if ((new Date(date.start).getTime() <= end.getTime()) && (new Date(date.end).getTime() >= start.getTime())) {
            disable = false;
          }
        })
      }
    })

    return disable;
  }

  reservated(): void {
    if (this.noLogin) {
      this.router.navigate(['/']);
    } else if (this.numberRooms > 0) {
      this.roomSelect.forEach(room => {
        if (room.count > 0) {

          if (!this.checkAvailability(room.id)) {
            let start = this.startDate.value || new Date();
            let end = this.endDate.value || new Date();
            this.success = false;
            this.modalTitle = 'Failure!';
            this.modalMessage = `You can not book the room from '${start.toDateString()}' to '${end.toDateString()}'!`;
          } else {
            this.reservationService.reservated(this.user._id, room.id, this.startDate.value || new Date(), this.endDate.value || new Date());
            this.roomService.updateRoomAvailability(this.hotelDetail._id, room.id, {start: this.startDate.value || new Date(), end: this.endDate.value || new Date()})
            this.success = true;
            this.modalTitle = 'Success!';
            this.modalMessage = 'You have successfully booked the room!';
          }

        }
        room.count = 0;
      })
      $('select').val(0);
    } else {
      this.success = false;
      this.modalTitle = 'Failure!';
      this.modalMessage = 'You have not selected a room!'
    }

    this.numberRooms = 0;
    this.totalPrice = 0;
    this.originPrice = 0;
  }
  
  changeSelect(): void {
    $('select').val(0);
    this.numberRooms = 0;
    this.totalPrice = 0;
    this.originPrice = 0;
    
    let start = this.startDate.value || new Date();
    let end = this.endDate.value || new Date();
    
    this.roomSelect.forEach(room => {
      let disable = false;
      room.unavailableDates.forEach(date => {
        if ((new Date(date.start).getTime() <= end.getTime()) && (new Date(date.end).getTime() >= start.getTime())) {
          disable = true;
        }
      })
      room.disable = disable;
    })
  }
  
  decreaseAdults(): void {
    if (!this.disableSelectAdults) {
      this.adults = this.adults - 1;
      this.disableSelectAdults = this.adults < 1;
    }
  }

  decreaseChildren(): void {
    if (!this.disableSelectChildren) {
      this.children = this.children - 1;
      this.disableSelectChildren = this.children < 1;
    }
  }

  decreaseRooms(): void {
    if (!this.disableSelectRooms) {
      this.rooms = this.rooms - 1;
      this.disableSelectRooms = this.rooms < 1;
    }
  }
  
  increaseAdults(): void {
    this.adults = this.adults + 1;
    this.disableSelectAdults = this.adults < 1;
  }

  increaseChildren(): void {
    this.children = this.children + 1;
    this.disableSelectChildren = this.children < 1;
  }

  increaseRooms(): void {
    this.rooms = this.rooms + 1;
    this.disableSelectRooms = this.rooms < 1;
  }
}
