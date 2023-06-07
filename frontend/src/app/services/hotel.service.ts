import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Hotel } from '../models/hotel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  initHotel = new Hotel('', '', '', '', '', 0, [''], '', [''], '', 0, 0, ['']);
  private hotelListSubject = new BehaviorSubject<Hotel[]>([this.initHotel]);
  private hotelDetailSubject = new BehaviorSubject<Hotel>(this.initHotel);
  public hotelListObservable$: Observable<Hotel[]>;
  public hotelDetailObservable$: Observable<Hotel>;

  constructor(private httpClient: HttpClient) {
    this.hotelListObservable$ = this.hotelListSubject.asObservable();
    this.hotelDetailObservable$ = this.hotelDetailSubject.asObservable();
    this.initHotels();
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(environment.hotel).pipe(
      tap({
        next: (hotels) => {
          // console.log(hotels)
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    );
  }

  initHotels(): void {
    this.httpClient.get<Hotel[]>(environment.hotel).subscribe(hotels => {
      this.hotelListSubject.next(hotels)
      this.hotelDetailSubject.next(hotels[0]);
    });
  }

  setHotelList(hotels: Hotel[]): void {
    this.hotelListSubject.next(hotels);
  }

  getHotelsInCity(cityID: string): void {
    this.httpClient.get<Hotel[]>(environment.hotel + `/hotelsInCity/${cityID}`).subscribe(hotels => {
      // console.log(hotels)
      this.setHotelList(hotels);
    });
  }

  getHotelsByType(hotelType: string): void {
    this.httpClient.get<Hotel[]>(environment.hotel + '/hotelsType', {
      params: {
        type: hotelType
      }
    }).subscribe(hotels => {
      // console.log(hotels);
      this.setHotelList(hotels);
    })
  }

  getHotelDetail(hotel: Hotel): void {
    this.hotelDetailSubject.next(hotel);
  }
  
}
