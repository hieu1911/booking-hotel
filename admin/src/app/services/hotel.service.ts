import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, forkJoin} from "rxjs";
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {CityService} from "./city.service";
import {Hotel} from "../models/Hotel";

@Injectable({
    providedIn: 'root'
})
export class HotelService {
    private countHotelsSubject: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
    private countHotelInCities: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    countHotels$: Observable<Number>;
    countHotelInCities$: Observable<number[]>;

    constructor(private httpClient: HttpClient, private cityServie: CityService) {
        this.countHotels$ = this.countHotelsSubject.asObservable();
        this.countHotelInCities$ = this.countHotelInCities.asObservable();
        this.getCountHotels();
    }

    getCountHotels(): void {
        this.httpClient.get<Number>(environment.hotel + '/count').subscribe(count => this.countHotelsSubject.next(count))
    }

    getCountHotelInCities(cities: string[]): void {
        let results: number[] = [];

        cities.forEach(name => {
            this.cityServie.getCityByName(name).subscribe(city => {
                if (city) {
                        let cityID = city._id;
                        this.httpClient.get<Hotel[]>(environment.hotel + `/hotelsInCity/${cityID}`).subscribe(hotels => {
                            results.push(hotels.length);
    
                        this.countHotelInCities.next(results);
                        });
                } else {
                    results.push(0);
                }
            })
        });



    }
}
