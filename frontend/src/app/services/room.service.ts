import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Room } from '../models/room';
import { RoomType } from '../models/roomType';
import { RoomOptions } from '../models/roomOptions';
import { environment } from '../../environments/environment';

export interface RoomObject {
  room: Room;
  roomOptions: RoomOptions[];
  type: RoomType;
}

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  initRoom = new Room('', '', '', '', 0, 0, '');
  private roomSubject: BehaviorSubject<RoomObject[]> = new BehaviorSubject<RoomObject[]>([]);
  roomObservable$: Observable<RoomObject[]>;

  constructor(private httpClient: HttpClient) { 
    this.roomObservable$ = this.roomSubject.asObservable();
    this.roomObservable$.subscribe(arr => {
      // console.log(arr.length)
    })
  }

  public getRoomInHotel(hotelID: string): void{
    if (hotelID == '') {
      hotelID = '6471ccdd7fc80551c57d0dc5';
    }

    this.httpClient.get<Room[]>(environment.roomInHotel + `/${hotelID}`).subscribe(rooms => {
      let roomObservable: RoomObject[] = [];
      rooms.forEach(room => {
        forkJoin([
          this.httpClient.get<RoomType>(environment.roomType + `/${room.roomTypeID}`),
          this.httpClient.get<RoomOptions[]>(environment.roomOptions + `/room/${room._id}`)
        ]).subscribe(([roomType, roomOptions])=> {
          roomObservable.push({room: room, roomOptions: roomOptions, type: roomType})
          this.roomSubject.next(roomObservable);
        })
      })
    });
  }

  public updateRoomAvailability(hotelID: string, id: string, dates: {start: Date, end: Date}): void {
    this.httpClient.put<RoomOptions>(environment.roomOptions + `/avaibility/${id}`, {
      dates
    }).subscribe(room => {
      this.getRoomInHotel(hotelID);
    })
  }
}