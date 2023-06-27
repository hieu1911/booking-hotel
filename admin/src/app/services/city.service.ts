import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { City } from "../models/City";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    private allCitiesSubject: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
    allCities$: Observable<City[]>;

    constructor(private http: HttpClient) {
        this.allCities$ = this.allCitiesSubject.asObservable();
    }

    getAllCity() {
        this.http.get<City[]>(environment.city).subscribe(cities => this.allCitiesSubject.next(cities));
    }

    getCityByName(cityName: string): Observable<City> {
        return this.http.get<City>(environment.city + '/name', {
            params: {name: cityName}
        });
    }
}
