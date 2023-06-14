import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import { Reservation } from '../models/Reservation'

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private countReservationsSubject: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
    private allReservationsSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
    countReservations$: Observable<Number>;
    allReservations$: Observable<Reservation[]>

    constructor(private httpClient: HttpClient) {
        this.countReservations$ = this.countReservationsSubject.asObservable();
        this.allReservations$ = this.allReservationsSubject.asObservable();
        
        this.getCountReservations();
        this.getAllReservations();
    }
    
    getCountReservations(): void {
        this.httpClient.get<Number>(environment.reservation + '/count').subscribe(count => this.countReservationsSubject.next(count));
    }
    
    getAllReservations(): void {
        this.httpClient.get<Reservation[]>(environment.reservation).subscribe(results => this.allReservationsSubject.next(results));
    }
}
