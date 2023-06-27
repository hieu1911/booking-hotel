import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {UserComponent} from "./pages/user/user.component";
import {HotelComponent} from "./pages/hotel/hotel.component";
import {RoomComponent} from "./pages/room/room.component";
import {ReservationComponent} from "./pages/reservation/reservation.component";

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent},
    {path: 'hotel', component: HotelComponent},
    {path: 'room', component: RoomComponent},
    {path: 'reservation', component: ReservationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
