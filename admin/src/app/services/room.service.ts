import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import { ReservationService } from "./reservation.service";
import { RoomOptions } from "../models/RoomOptions";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private countRoomsSubject: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
    private totalRevenueSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    countRooms$: Observable<Number>;
    totalRevenue$: Observable<number>

    constructor(private httpClient: HttpClient, private reservationService: ReservationService) {
        this.countRooms$ = this.countRoomsSubject.asObservable();
        this.totalRevenue$ = this.totalRevenueSubject.asObservable();
        this.getCountRooms()
        this.getTotalRevenue();
    }
    
    getCountRooms(): void {
        this.httpClient.get<Number>(environment.room + '/count').subscribe(count => {
            this.countRoomsSubject.next(count);
//            console.log(count);
        })
    }
    
    getTotalRevenue(): void {
        this.reservationService.allReservations$.subscribe(reservations => {
            this.totalRevenueSubject.next(0);
            reservations.forEach(reservation => {
                this.httpClient.get<RoomOptions>(environment.roomOptions + `/id/${reservation.roomOptionID}`).subscribe(roomOption => {
                    let value = this.totalRevenueSubject.getValue() + roomOption.price;
                    this.totalRevenueSubject.next(value);
                })
            })
        })
    }
}
