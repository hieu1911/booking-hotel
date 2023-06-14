import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {
    
  showSettings: boolean = false;
  
  noLogin: boolean = true;

  user$: Observable<User>
  user!: User;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = this.userService.userObservable$;
  }

  ngOnInit(): void {

    this.user$.subscribe(user => {
      if (user.username !== '') {
        this.user = user;
        this.noLogin = false;
      } else {
        this.noLogin = true;
        this.router.navigate(['/login'])
      }
    });
  }

  signOut(): void {
    this.noLogin = true;
    this.userService.setUserToLocalStorage(new User('', '', '', '','', false));
  }

}
