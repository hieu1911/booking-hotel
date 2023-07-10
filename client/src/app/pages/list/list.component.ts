import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HotelService } from '../../services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { Hotel } from '../../models/hotel'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  budgetFiltes = {
    title: 'Your Budget (per night)',
    items: ['US$0 – US$50', 'US$50 – US$100', 'US$100 – US$150', 'US$150 – US$200', 'US$200 +']
  }

  popularFilter = {
    title: 'Popular Filters',
    items: ['Villas', 'Resorts', 'Hotels', 'Hostels', 'Homestays', 'Gueshouses']
  }

  propertyRating = {
    title: 'Property Rating',
    items: ['1 star', '2 star', '3 star', '4 star', '5 star', 'Unrated']
  }

  distanceFromCenter = {
    title: 'Distance from center',
    items: ['Less than 1km', 'Less than 3km', 'Less than 5km']
  }

  filters = [this.budgetFiltes, this.popularFilter, this.propertyRating, this.distanceFromCenter];

  hotelList$: Observable<Hotel[]>;

  constructor(private router: Router, private hotelService: HotelService, private roomService: RoomService) {
    window.scroll(0, 0)
    
    this.hotelList$ = this.hotelService.hotelListObservable$;
    this.hotelList$.subscribe(hotelList => {
    })
  }

  navigateHotelDetail(hotel: Hotel): void {
    this.hotelService.getHotelDetail(hotel);
    this.roomService.getRoomInHotel(hotel._id);
    this.router.navigate(['/hotel-detail'])
  }
}
