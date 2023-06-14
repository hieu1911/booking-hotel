import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { City } from "../models/City";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {
        
    }

    getCityByName(cityName: string): Observable<City> {
        return this.http.get<City>(environment.city + '/name', {
            params: {name: cityName}
        });
    }
}
