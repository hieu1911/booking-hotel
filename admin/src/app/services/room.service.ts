import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import {environment} from '../../environments/environment';
import { ReservationService } from "./reservation.service";
import { RoomOptions } from "../models/RoomOptions";
import { Room } from "../models/Room";
import { Hotel } from '../models/Hotel';
import { RoomType } from '../models/RoomType';

export interface RoomObj {
    hotel: Hotel,
    room: Room,
    roomOption: RoomOptions
}


@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private countRoomsSubject: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
    private totalRevenueSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private roomObjSubject: BehaviorSubject<RoomObj[]> = new BehaviorSubject<RoomObj[]>([]);
    private allRoomSubject: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
    countRooms$: Observable<Number>;
    totalRevenue$: Observable<number>
    roomObj$: Observable<RoomObj[]>;
    allRoom$: Observable<Room[]>;

    constructor(private httpClient: HttpClient, private reservationService: ReservationService) {
        this.countRooms$ = this.countRoomsSubject.asObservable();
        this.totalRevenue$ = this.totalRevenueSubject.asObservable();
        this.roomObj$ = this.roomObjSubject.asObservable();
        this.allRoom$ = this.allRoomSubject.asObservable();
        this.getCountRooms()
        this.getTotalRevenue();
    }

    getAllRooms(): void {
        this.httpClient.get<Room[]>(environment.room).subscribe(rooms => {
            this.allRoomSubject.next(rooms);
        })
    }
    
    getCountRooms(): void {
        this.httpClient.get<Number>(environment.room + '/count').subscribe(count => {
            this.countRoomsSubject.next(count);
//            console.log(count);
        })
    }
    
    getTotalRevenue(): void {
        this.reservationService.allReservations$.subscribe(reservations => {
            this.totalRevenueSubject.next(0);
            reservations.forEach(reservation => {
                this.httpClient.get<RoomOptions>(environment.roomOptions + `/id/${reservation.roomOptionID}`).subscribe(roomOption => {
                    let value = this.totalRevenueSubject.getValue() + roomOption.price;
                    this.totalRevenueSubject.next(value);
                })
            })
        })
    }

    getRoomObj(): void {
        let roomObjs: RoomObj[] = [];
        this.httpClient.get<RoomOptions[]>(environment.roomOptions).subscribe(roomOptions => {
            roomOptions.forEach(roomOption => {
                this.httpClient.get<Room>(environment.room + `/id/${roomOption.roomID}`).subscribe(room => {
                   this.httpClient.get<Hotel>(environment.hotel + `/id/${room.hotelID}`). subscribe(hotel => {
                    roomObjs.push({room, hotel, roomOption});
                    this.roomObjSubject.next(roomObjs)
                   })
                })
            })
        })
    }

    searchRoomByHotelName(name: string): void {
        if (name !== '') {
            let roomObjs: RoomObj[] = [];
            this.httpClient.get<RoomOptions[]>(environment.roomOptions).subscribe(roomOptions => {
                roomOptions.forEach(roomOption => {
                    this.httpClient.get<Room>(environment.room + `/id/${roomOption.roomID}`).subscribe(room => {
                    this.httpClient.get<Hotel>(environment.hotel + `/id/${room.hotelID}`). subscribe(hotel => {
                        if (hotel.name == name) {
                            roomObjs.push({room, hotel, roomOption});
                            this.roomObjSubject.next(roomObjs)
                        }
                    })
                    })
                })
            })
        } else {
            this.getRoomObj();
        }
    }

    deleteRoom(id: string) {
        this.httpClient.delete<RoomOptions>(environment.roomOptions + `/delete/${id}`).subscribe(results => {
            this.getRoomObj();
        })
    }

    createRoom(createForm: FormGroup) {
        this.httpClient.post<RoomType>(environment.roomType, {
            size: createForm.value.size,
            wifi: createForm.value.wifi,
            balcony: createForm.value.balcony,
            cityView: createForm.value.cityView,
            airConditioning: createForm.value.ac,
            attachedBathroom: createForm.value.ab,
            flatScreenTV: createForm.value.flatScreenTV,
            miniBar: createForm.value.miniBar,
            privateBathroom: createForm.value.privateBathroom,
            bathtub: createForm.value.bathtub,
            soundproof: createForm.value.soundproof,
            patio: createForm.value.patio,
            oceanView: createForm.value.oceanView
        })
        .subscribe(roomType => {
            console.log(roomType)
            this.httpClient.post<Room>(environment.room, {
                hotelID: createForm.value.hotel,
                roomTypeID: roomType._id,
                title: createForm.value.title,
                twinBeds: createForm.value.twinB,
                queenBed: createForm.value.queenB,
                desc: createForm.value.desc
            }).subscribe(room => {
                console.log(room)
                this.httpClient.post<RoomOptions>(environment.roomOptions, {
                    roomID: room._id,
                    maxPeoples: createForm.value.maxPeople,
                    price: createForm.value.price,
                    title: createForm.value.offer,
                    desc: [createForm.value.benefit1, createForm.value.benefit2],
                    breakfastOption: createForm.value.breakfast
                }).subscribe(roomOption => {
                    this.getRoomObj();
                })
            })
        })
    }

    addRoom(addRoomForm: FormGroup) {
        this.httpClient.post<RoomOptions>(environment.roomOptions, {
            roomID: addRoomForm.value.roomID,
            maxPeoples: addRoomForm.value.maxPeople,
            price: addRoomForm.value.price,
            title: addRoomForm.value.offer,
            desc: [addRoomForm.value.benefit1, addRoomForm.value.benefit2],
            breakfastOption: addRoomForm.value.breakfast
        }).subscribe(roomOption => {
            this.getRoomObj();
        })
    }

    updateRoomOption(editForm: FormGroup): void {
        this.httpClient.put<RoomOptions>(environment.roomOptions + `/update/${editForm.value.roomID}`, {
            maxPeoples: editForm.value.maxPeople,
            price: editForm.value.price,
            title: editForm.value.offer,
            desc: [editForm.value.benefit1, editForm.value.benefit2],
            breakfastOption: editForm.value.breakfast
        }).subscribe(roomOption => {
            this.getRoomObj();
        })
    }
}
