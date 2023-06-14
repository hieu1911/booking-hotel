import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() nav: string = '';
    
    menu = [
        {
            img: '../../../assets/images/dashboard.png',
            img_active: '../../../assets/images/dashboard_active.png',
            title: 'Dashboard',
            active: true,
            navigator: ''
        },
        {
            img: '../../../assets/images/user.png',
            img_active: '../../../assets/images/user_active.png',
            title: 'User',
            active: false,
            navigator: '/user'
        },
        {
            img: '../../../assets/images/city.png',
            img_active: '../../../assets/images/city_active.png',
            title: 'City',
            active: false,
            navigator: '/city'
        },
        {
            img: '../../../assets/images/hotel.png',
            img_active: '../../../assets/images/hotel_active.png',
            title: 'Hotel',
            active: false,
            navigator: '/hotel'
        },
        {
            img: '../../../assets/images/room.png',
            img_active: '../../../assets/images/room_active.png',
            title: 'Room',
            active: false,
            navigator: '/room'
        },
        {
            img: '../../../assets/images/reservation.png',
            img_active: '../../../assets/images/reservation_active.png',
            title: 'Reservation',
            active: false,
            navigator: '/reservation'
        }
    ]
    
    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.menu.forEach(item => {
            if (item.navigator === this.nav) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
    }
    
    
    
    navigate(url: string): void {
        this.router.navigate([url]);
    }
}
