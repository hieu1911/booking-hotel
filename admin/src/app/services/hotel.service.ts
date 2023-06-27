import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
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
    private allHotelsSubject: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
    countHotels$: Observable<Number>;
    countHotelInCities$: Observable<number[]>;
    allHotels$: Observable<Hotel[]>;

    constructor(private httpClient: HttpClient, private cityServie: CityService) {
        this.countHotels$ = this.countHotelsSubject.asObservable();
        this.countHotelInCities$ = this.countHotelInCities.asObservable();
        this.allHotels$ = this.allHotelsSubject.asObservable();
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

    getAllHotels(): void {
        this.httpClient.get<Hotel[]>(environment.hotel).subscribe(hotels => {
            this.allHotelsSubject.next(hotels);
        })
    }

    searchHotelByName(name: string): void {
        if (name !== '') {
            this.httpClient.get<Hotel[]>(environment.hotel + '/getByName', {
                params: {name}
            }).subscribe(hotels => {
                this.allHotelsSubject.next(hotels);
            });
        } else {
            this.getAllHotels();
        }
    }

    createHotel(
        cityID: string,
        name: string,
        type: string,
        address: string,
        distance: number,
        photos: string[],
        desc: string[],
        review: string,
        rating: number,
        details: string[],
        cheapestPrice: number
    ): Observable<Hotel> {
        return this.httpClient.post<Hotel>(environment.hotel, {
            cityID,
            name,
            type,
            address,
            distance,
            photos,
            desc,
            review,
            rating,
            details,
            cheapestPrice
        }).pipe(
            tap({
                next: (hotel) => {
//                    console.log('Success!');
                    this.getAllHotels();
                },
                error: (error) => {
                    console.log('Error!!!', error.error);
                }
            })
        )
    }

    updateHotel(
        id: string,
        cityID: string,
        name: string,
        type: string,
        address: string,
        distance: number,
        photos: string[],
        desc: string[],
        review: string,
        rating: number,
        details: string[],
        cheapestPrice: number
    ): Observable<Hotel> {

        console.log(id)

        return this.httpClient.put<Hotel>(environment.hotel + `/update/${id}`, {
            cityID,
            name,
            type,
            address,
            distance,
            photos,
            desc,
            review,
            rating,
            details,
            cheapestPrice
        }).pipe(
            tap({
                next: (hotel) => {
                    // console.log('Success!');
                    this.getAllHotels();
                },
                error: (error) => {
                    console.log('Error!!!', error.error);
                }
            })
        )
    }

    deleteHotel(hotelId: string): void {
        this.httpClient.delete<Hotel>(environment.hotel + `/delete/${hotelId}`).subscribe(res => this.getAllHotels());

        // when delete a hotel, it also delete all room in this hotel
        // code here
    }
}
