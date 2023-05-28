import { Component, HostListener } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { CityService } from 'src/app/services/city.service';
import { HotelService } from 'src/app/services/hotel.service';
import { City } from '../../models/city'
import { Hotel } from '../../models/hotel'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.customOptions = { ...this.customOptions };
  }

  cities$: Observable<City[]>;
  hotels$: Observable<Hotel[]>;

  topRatingHotel: Hotel[] = new Array<Hotel>();
  topCheapestHotel: Hotel[] = new Array<Hotel>();

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  constructor(private cityService: CityService, private hotelService: HotelService) {
    this.cities$ = this.cityService.getAllCities();
    this.hotels$ = this.hotelService.getAllHotels();
    
    this.hotels$.subscribe(data => {
      data.forEach(hotel => {
        this.topRatingHotel.push(hotel);
        this.topCheapestHotel.push(hotel);
      })
      
      this.topRatingHotel.sort((a, b) => (b.rating - a.rating));
      this.topRatingHotel = this.topRatingHotel.slice(0, 4);

      this.topCheapestHotel.sort((a, b) => (b.cheapestPrice - a.cheapestPrice));
      this.topCheapestHotel = this.topCheapestHotel.slice(0, 4)
    });

  }
}
