import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable, Subscription, debounceTime, distinctUntilChanged} from "rxjs";

import { RoomService, RoomObj } from '../../services/room.service';
import { Hotel } from '../../models/Hotel';
import { Room } from '../../models/Room';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {

  searchVal: string = '';
  inputForm: FormControl = new FormControl();
  inputSub: Subscription = new Subscription;

  roomObjs$: Observable<RoomObj[]>;
  allRoom$: Observable<Room[]>;

  createNewRoom: boolean = true;
  allHotels$: Observable<Hotel[]>;

  createForm!: FormGroup;
  addRoomForm!: FormGroup;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private roomService: RoomService, private hotelService: HotelService) {
    this.roomService.getRoomObj();
    this.hotelService.getAllHotels();
    this.roomService.getAllRooms();
    this.roomObjs$ = this.roomService.roomObj$;
    this.allHotels$ = this.hotelService.allHotels$;
    this.allRoom$ = this.roomService.allRoom$;
  }

  ngOnInit(): void {
    this.inputSub = this.inputForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(val => {
      this.searchVal = val;
      this.roomService.searchRoomByHotelName(this.searchVal);
    });

    this.initCreateForm();
  }

  initCreateForm(): void {
    this.createForm = this.fb.group({
      hotel: ['', Validators.required],
      title: [''],
      desc: [''],
      size: [25],
      twinB: [2],
      queenB: [0],
      wifi: [true],
      balcony: [false],
      cityView: [false],
      ac: [false],
      ab: [false],
      flatScreenTV: [false],
      miniBar: [false],
      privateBathroom: [false],
      bathtub: [false],
      soundproof: [false],
      patio: [false],
      oceanView: [false],
      maxPeople: [2],
      price: [''],
      offer: ['Includes taxes and fees'],
      benefit1: ['Free cancellation'],
      benefit2: ['No prepayment needed'],
      breakfast: ['Breakfast US$5 (optional)']
    })

    this.addRoomForm = this.fb.group({
      roomID: ['', Validators.required],
      maxPeople: [2],
      price: [''],
      offer: ['Includes taxes and fees'],
      benefit1: ['Free cancellation'],
      benefit2: ['No prepayment needed'],
      breakfast: ['Breakfast US$5 (optional)']
    })
  }

  initEditRoomForm(roomObj: RoomObj): void {

  }

  onUpdateRoom(): void {

  }

  createRoom(): void {
    this.roomService.createRoom(this.createForm)
    document.getElementById('btn-close')?.click();
  }

  addRoom(): void {
    this.roomService.addRoom(this.addRoomForm)
    document.getElementById('btn-close')?.click();
  }

  onDeleteRoom(roomObj: RoomObj): void {
    this.roomService.deleteRoom(roomObj.roomOption._id);
  }

  formatBed(twin: number, queen: number): string {
    if (twin == 0) {
      return `${queen} Queen bed`;
    } else if (queen == 0) {
      return `${twin} Twin bed`;
    } else {
      return `${twin} Twin bed and ${queen} Queen bed`;
    }
  }

}
