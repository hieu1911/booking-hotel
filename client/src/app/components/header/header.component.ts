import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';
import { HotelService } from '../../services/hotel.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle: boolean = false;
  @Input() hotelDetail: boolean = false;

  @ViewChild('inputVal') inputElement: ElementRef;
  
  user$: Observable<User>

  noLogin: boolean = true;
  user!: User;

  showOptionsSelector: boolean = false;

  adults: number = 2;
  children: number = 0;
  rooms: number = 1;
  disableSelectAdults: boolean = this.adults < 1;
  disableSelectChildren: boolean = this.children < 1;
  disableSelectRooms: boolean = this.rooms < 1;

  constructor(inputElement: ElementRef,
     private router: Router,
     private userService: UserService,
     private cityService: CityService,
     private hotelService: HotelService) {
    this.user$ = this.userService.userObservable$;
    this.inputElement = inputElement;
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

  searchFunc(): void {
    let value = this.inputElement.nativeElement.value;

    this.cityService.getCityByName(value).subscribe(city => {
      if (city) {
        this.hotelService.getHotelsInCity(city._id);
      } else {
        this.hotelService.getHotelByName(value).subscribe(hotel => {
          console.log(hotel)
          if (hotel) {
            this.hotelService.setHotelList([hotel]);
          } else {
            this.hotelService.setHotelList([]);
          }
        })
      }
    });

    this.router.navigate(['/hotel-list']);
  }

}
