import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable, Subscription, debounceTime, distinctUntilChanged} from "rxjs";

import { HotelService } from '../../services/hotel.service';
import { CityService } from '../../services/city.service';
import { Hotel } from '../../models/Hotel';
import { City } from '../../models/City';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  searchVal: string = '';
  inputForm: FormControl = new FormControl();
  inputSub: Subscription = new Subscription;
  allHotels$: Observable<Hotel[]>;
  allCities$: Observable<City[]>;

  createForm!: FormGroup;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private hotelService: HotelService, private cityService: CityService) {
    this.hotelService.getAllHotels();
    this.cityService.getAllCity();
    this.allHotels$ = this.hotelService.allHotels$;
    this.allCities$ = this.cityService.allCities$;
  }

  ngOnInit(): void {
    this.inputSub = this.inputForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(val => {
      this.searchVal = val;
      this.hotelService.searchHotelByName(this.searchVal);
    });

    this.initCreateForm();
    this.initEditForm();
  }

  initCreateForm(): void {
    this.createForm = this.fb.group({
      city: ['', Validators.required],
      type: ['hotel', Validators.required],
      distance: ['', Validators.required],
      minPrice: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['', Validators.required],
      review: ['', Validators.required],
      desc0: ['', Validators.required],
      desc1: ['', Validators.required],
      desc2: ['FREE cancellation', Validators.required],
      desc3: ['No prepayment needed', Validators.required],
      photos0: [''],
      photos1: [''],
      photos2: [''],
      photos3: [''],
      photos4: [''],
      photos5: [''],
      details0: [''],
      details1: [''],
      details2: [''],
      details3: [''],
     });
  }

  initEditForm(): void {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      city: ['', Validators.required],
      type: ['hotel', Validators.required],
      distance: ['', Validators.required],
      minPrice: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['', Validators.required],
      review: ['', Validators.required],
      desc0: ['', Validators.required],
      desc1: ['', Validators.required],
      desc2: ['FREE cancellation', Validators.required],
      desc3: ['No prepayment needed', Validators.required],
      photos0: [''],
      photos1: [''],
      photos2: [''],
      photos3: [''],
      photos4: [''],
      photos5: [''],
      details0: [''],
      details1: [''],
      details2: [''],
      details3: [''],
     });
  }

  createHotel(): void {
    this.hotelService.createHotel(
      this.createForm.value.city.trim(),
      this.createForm.value.name.trim(),
      this.createForm.value.type.trim(),
      this.createForm.value.address.trim(),
      this.createForm.value.distance,
      [
        this.createForm.value.photos0.trim(),
        this.createForm.value.photos1.trim(),
        this.createForm.value.photos2.trim(),
        this.createForm.value.photos3.trim(),
        this.createForm.value.photos4.trim(),
        this.createForm.value.photos5.trim()
      ],
      [
        this.createForm.value.desc0.trim(),
        this.createForm.value.desc1.trim(),
        this.createForm.value.desc2.trim(),
        this.createForm.value.desc3.trim()
      ],
      this.createForm.value.review.trim(),
      this.createForm.value.rating,
      [
        this.createForm.value.details0.trim(),
        this.createForm.value.details1.trim(),
        this.createForm.value.details2.trim(),
        this.createForm.value.details3.trim()
      ],
      this.createForm.value.minPrice,
    ).subscribe(result => {
      document.getElementById('btn-close')?.click();
    });
  }

  onDeleteHotel(hotel: Hotel): void {
    this.hotelService.deleteHotel(hotel._id);
  }

  initEditHotelForm(hotel: Hotel): void {
    this.editForm = this.fb.group({
      id: [hotel._id, Validators.required],
      city: [hotel.cityID, Validators.required],
      type: [hotel.type, Validators.required],
      distance: [hotel.distance, Validators.required],
      minPrice: [hotel.cheapestPrice, Validators.required],
      name: [hotel.name, Validators.required],
      address: [hotel.address, Validators.required],
      rating: [hotel.rating, Validators.required],
      review: [hotel.review, Validators.required],
      desc0: [hotel.desc[0], Validators.required],
      desc1: [hotel.desc[1], Validators.required],
      desc2: [hotel.desc[2], Validators.required],
      desc3: [hotel.desc[3], Validators.required],
      photos0: [hotel.photos[0]],
      photos1: [hotel.photos[1]],
      photos2: [hotel.photos[2]],
      photos3: [hotel.photos[3]],
      photos4: [hotel.photos[4]],
      photos5: [hotel.photos[5]],
      details0: [hotel.details[0]],
      details1: [hotel.details[1]],
      details2: [hotel.details[2]],
      details3: [hotel.details[3]],
     });
  }

  onUpdateHotel(): void {
    this.hotelService.updateHotel(
      this.editForm.value.id,
      this.editForm.value.city.trim(),
      this.editForm.value.name.trim(),
      this.editForm.value.type.trim(),
      this.editForm.value.address.trim(),
      this.editForm.value.distance,
      [
        this.editForm.value.photos0?.trim(),
        this.editForm.value.photos1?.trim(),
        this.editForm.value.photos2?.trim(),
        this.editForm.value.photos3?.trim(),
        this.editForm.value.photos4?.trim(),
        this.editForm.value.photos5?.trim()
      ],
      [
        this.editForm.value.desc0?.trim(),
        this.editForm.value.desc1?.trim(),
        this.editForm.value.desc2?.trim(),
        this.editForm.value.desc3?.trim()
      ],
      this.editForm.value.review.trim(),
      this.editForm.value.rating,
      [
        this.editForm.value.details0?.trim(),
        this.editForm.value.details1?.trim(),
        this.editForm.value.details2?.trim(),
        this.editForm.value.details3?.trim()
      ],
      this.editForm.value.minPrice,
    )
    .subscribe(result => {
      document.getElementById('update-btn-close')?.click();
    });
  }
}
