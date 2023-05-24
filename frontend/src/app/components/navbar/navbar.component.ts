import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

declare var bootstrap: any;

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

  constructor(private userService: UserService) {
    this.user$ = this.userService.userObservable$;
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
  }

  signOut(): void {
    this.noLogin = true;
    this.userService.setUserToLocalStorage(new User('', '', '', ''));
  }

}
