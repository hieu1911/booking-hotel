import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { City } from '../models/city';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private initCity = new City('', '', '', '', [''], '');
  private citySubject = new BehaviorSubject<City>(this.initCity);
  public cityObservable$: Observable<City>;

  constructor(private http: HttpClient) { 
    this.cityObservable$ = this.citySubject.asObservable();
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(environment.city).pipe(
      tap({
        next: (cities) => {
          // console.log(cities)
        },
        error: (error) => {
          console.log(error.error);
        }
      })
    )
  }

  getCityByName(cityName: string): Observable<City> {
    return this.http.get<City>(environment.city + '/name', {
      params: {name: cityName}
    }).pipe(
      tap({
        next: (city) =>{
          // console.log(city);
        },
        error: (error) => console.log(error.error)
      })
    )
  }
}
