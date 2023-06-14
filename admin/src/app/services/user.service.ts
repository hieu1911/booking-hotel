import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  private countUsersSubject = new BehaviorSubject<Number>(0);
  public userObservable$: Observable<User>;
  public countUsers$: Observable<Number>;

  constructor(private http: HttpClient) {
    this.userObservable$ = this.userSubject.asObservable();
    this.countUsers$ = this.countUsersSubject.asObservable();
    
    this.getNumberOfUsers();
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

  register(username: string, email: string, password: string, phoneNumber: string): Observable<User> {
    return this.http.post<User>(environment.registerUrl, {
      username,
      email,
      password,
      phoneNumber,
      isAdmin: true
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

  setUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User('', '', '', '', '', false);
  }
    
    
    getNumberOfUsers(): void {
      this.http.get<Number>(environment.user + '/numUsers').subscribe(count => {
          this.countUsersSubject.next(count);
//          console.log(count);
      });
  }
}
