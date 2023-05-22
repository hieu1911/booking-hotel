import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable$: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable$ = this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(environment.loginUrl, {email, password}).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.setUserToLocalStorage(user);
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    )
  }

  register(username: string, email: string, password: string, phoneNunber: string): Observable<User> {
    return this.http.post<User>(environment.registerUrl, {
      username,
      email,
      password,
      phoneNunber
    }).pipe(
      tap({
        next: (user) => {
          
        },
        error: (error) => {
          console.log('Error!!!', error.error);
        }
      })
    )
  }

  private setUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User('', '', '', '');
  }
}
