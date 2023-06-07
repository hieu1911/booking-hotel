import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Reservation } from '../models/reservation';
import { Hotel } from '../models/hotel';
import { Room } from '../models/room';
import { RoomOptions } from '../models/roomOptions';

export interface ReservationObject {
  reservation: Reservation,
  roomOptions: RoomOptions,
  room: Room,
  hotel: Hotel
}

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  private reservationSubject: BehaviorSubject<ReservationObject[]> = new BehaviorSubject<ReservationObject[]>([]);
  reservationObservable$: Observable<ReservationObject[]>;

  constructor(private httpClient: HttpClient) {
    this.reservationObservable$ = this.reservationSubject.asObservable();
  }

  reservated(uid: string, rid: string, start: Date, end: Date): void {
    this.httpClient.post<Reservation>(environment.reservation, {
      userID: uid,
      roomOptionID: rid,
      startDate: start,
      endDate: end
    }).pipe(tap({
      next: (reservation) => {
        // console.log(reservation)
      },
      error: (err) => {
        console.log(err)
      }
    })).subscribe(reservation => {})
  }

  getReservation(uid: String): void {
    this.httpClient.get<Reservation[]>(environment.reservation).subscribe(reservations => {

      const res = reservations.filter(reservation => reservation.userID === uid)
      let reservationsObj: ReservationObject[] = [];

      res.forEach(reservation => {
        this.httpClient.get<RoomOptions>(environment.roomOptions + `/${reservation.roomOptionID}`).subscribe(roomOptions => {
          this.httpClient.get<Room>(environment.room + `/${roomOptions.roomID}`).subscribe(room => {
            this.httpClient.get<Hotel>(environment.hotel + `/${room.hotelID}`).subscribe(hotel => {
              reservationsObj.push({reservation, roomOptions, room, hotel});
              this.reservationSubject.next(reservationsObj);
            })
          })
        })
      })
    })
  }
}
