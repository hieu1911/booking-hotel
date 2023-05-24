import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
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

  constructor(private userService: UserService) {
    this.user$ = this.userService.userObservable$;
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
  
}
