import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Hotel } from '../models/hotel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private initHotel = new Hotel('', '', '', '', '', 0, [''], '', [''], '', 0, 0, ['']);
  private hotelListSubject = new BehaviorSubject<Hotel[]>([this.initHotel]);
  public hotelListObservable$: Observable<Hotel[]>;

  constructor(private http: HttpClient) {
    this.hotelListObservable$ = this.hotelListSubject.asObservable();
    this.initHotelList();
  }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(environment.allHotels).pipe(
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

  initHotelList(): void {
    this.http.get<Hotel[]>(environment.allHotels).subscribe(hotels => this.hotelListSubject.next(hotels));
  }

  setHotelList(hotels: Hotel[]): void {
    this.hotelListSubject.next(hotels);
  }
  
}
