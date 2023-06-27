import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/User';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
    private countUsersSubject = new BehaviorSubject<Number>(0);
    private allUsersSubject = new BehaviorSubject<User[]>([]);
    public userObservable$: Observable<User>;
    public countUsers$: Observable<Number>;
    public allUsers$: Observable<User[]>

    constructor(private http: HttpClient) {
        this.userObservable$ = this.userSubject.asObservable();
        this.countUsers$ = this.countUsersSubject.asObservable();
        this.allUsers$ = this.allUsersSubject.asObservable();

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

    register(username: string, email: string, password: string, phoneNumber: string, isAdmin: boolean): Observable<User> {
        return this.http.post<User>(environment.registerUrl, {
            username,
            email,
            password,
            phoneNumber,
            isAdmin
        }).pipe(
            tap({
                next: (user) => {
//                    console.log('Success!');
                    this.getAllUsers();
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

    getAllUsers(): void {
        this.http.get<User[]>(environment.user).subscribe(users => this.allUsersSubject.next(users))
    }

    getNumberOfUsers(): void {
        this.http.get<Number>(environment.user + '/numUsers').subscribe(count => {
            this.countUsersSubject.next(count);
        });
    }

    searchUserByName(name: string) {
        if (name !== '') {
            this.http.get<User[]>(environment.user + '/getByName', {
                params: {name}
            }).subscribe(users => {
                this.allUsersSubject.next(users);
            });
        } else {
            this.getAllUsers();
        }
    }

    deleteUser(user: User): void {
        this.http.delete<User>(environment.user + `/delete/${user._id}`).subscribe(res => this.getAllUsers());
    }

    updateUser(id: string, username: string, email: string, phoneNumber: string, isAdmin: boolean): Observable<User> {
        // console.log(id, username, email, phoneNumber, isAdmin)
        return this.http.put<User>(environment.user + `/update/${id}`, {
            username,
            email,
            phoneNumber,
            isAdmin
        }).pipe(
            tap({
                next: (user) => {
                    this.getAllUsers();
                },
                error: (error) => {
                    console.log('Error!!!', error.error);
                }
            })
        )
    }
}
