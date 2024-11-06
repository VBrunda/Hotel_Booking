import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit{
  data: any;
  bookingDetails!: FormGroup;

  constructor(private fb:FormBuilder, private bookingService: BookingsService){}


  ngOnInit(): void {
    this.bookingService.currentBooking.subscribe(data => {
      this.data = data;
      if(data){
        this.initializeForm();
      }
    });
  }

  initializeForm(){
    this.bookingDetails = this.fb.group({
      bookedOn: [new Date(this.data.createdDate).toISOString().split('T')[0]],
      bookingFrom: [new Date(this.data.bookingFromDate).toISOString().split('T')[0]],
      bookingTo: [new Date(this.data.bookingToDate).toISOString().split('T')[0]],
      user: [this.data.createBy],
      room: this.fb.group({
        type: [this.data.room.name],
        number: [this.data.room.roomId],
        capacity: [this.data.room.roomCapacity],
        extension: [this.data.room.extensionNo],
        ac: [this.data.room.isACAvailable],
        tariff: [this.data.room.roomTariff]
      }), 
      customer: this.fb.group({
        name: [this.data.customer.name],
        email: [this.data.customer.email],
        aadharNo: [this.data.customer.aadharNo],
        contact: [this.data.customer.mobileNo],
        address: [this.data.customer.address],
        city: [this.data.customer.city],
      }),
      guest: this.fb.array([])
    });

    this.populateGuestDetails();
  }

  
  get guest(): FormArray {
    return this.bookingDetails.get('guest') as FormArray;
  }

  // guestDetail(): FormGroup {
  //   return this.data.guestDetails.foreach((guest:any) => {
  //      this.guestDetails.push(this.fb.group({
  //       name: [guest.name],
  //       aadharNo: [guest.aadharNo]
  //     })
  //   )
  //   })
  // }

  populateGuestDetails() {
    if (this.data.guestDetails && Array.isArray(this.data.guestDetails)) {
      this.data.guestDetails.forEach((guest: any) => {
        this.guest.push(this.fb.group({
          name: [guest.name],
          aadharNo: [guest.aadharNo]
        }));
      });
    }
  }

  onSubmit(){}
}

