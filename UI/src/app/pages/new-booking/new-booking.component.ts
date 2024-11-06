import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { RoomsService } from '../../services/rooms.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrl: './new-booking.component.css'
})
export class NewBookingComponent implements OnInit {
  bookingForm!: FormGroup;

  roomList: any[] = [];
  roomNumber: number[] = [];
  roomNames: any[] = [];

  constructor(private fb: FormBuilder, private roomService: RoomsService, private bookingService: BookingsService) { }

  ngOnInit(): void {
    this.bookingService.currentBooking.subscribe(data => {
      debugger;
      this.initializeForm();
      if(Object.keys(data).length > 0) this.setFewInitialValues(data);      
      this.loadRooms();
    });
  }

  initializeForm() {
    this.bookingForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      mobileNo: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [null, [Validators.required, Validators.email]],
      aadharNo: [null, [Validators.required, Validators.pattern(/^\d{12}$/)]],
      city: [null, [Validators.required]],
      address: [null, [Validators.required]],
      selectedRoomName: [null, [Validators.required]],
      roomId: [0, [Validators.required]],
      bookingFromDate: [null, [Validators.required]],
      bookingToDate: [null, [Validators.required]],
      narration: [null],
      guestDetails: this.fb.array([this.createGuestDetail()]) // Initialize with one guest detail
    }, { validators: this.customDateValidator }
    );
  }

  setFewInitialValues(data:any){
    this.bookingForm.patchValue({
      selectedRoomName: data.roomType,
      roomId: data.roomNo,
      bookingFromDate: new Date(data.date).toISOString().split('T')[0]
    });
  }

  createGuestDetail(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      aadharNo: [null, [Validators.required, Validators.pattern(/^\d{12}$/)]]
    });
  }

  get guestDetails(): FormArray {
    return this.bookingForm.get('guestDetails') as FormArray;
  }

  addGuest() {
    this.guestDetails.push(this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      aadharNo: [null, [Validators.required, Validators.pattern(/^\d{12}$/)]]
    })
    );
  }

  removeGuestDetail(index: number) {
    this.guestDetails.removeAt(index);
  }

  loadRooms() {
    this.roomService.getAllRooms().then(response => {
      if (response.success) {
        this.roomList = response.data;
        this.roomNames = Array.from(new Set(this.roomList.map(room => room.name)));
      }
    });
  }

  updateRoomNumbers() {
    let roomType = this.bookingForm.get('selectedRoomName')?.value
    this.roomNumber = this.roomList.filter(room => (room.name === roomType && room.isAvailable)).map(room => room.roomId)
  }

  customDateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const fromDate = new Date(control.get('bookingFromDate')?.value);
    const toDate = new Date(control.get('bookingToDate')?.value);

    if (fromDate < today || toDate < today) {
      return { datesInPast: true }
    }

    if (toDate < fromDate) {
      return { invalidDateRange: true };
    }

    return null;
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.bookingService.newBooking(this.bookingForm.value).then((response: any) => {
        if (response.success) {
          this.resetForm(); // Reset the form after submission
        }
      });
    }
  }

  resetForm() {
    this.guestDetails.reset();
    this.bookingForm.reset(); // Resets the form to its initial state
    this.loadRooms();
  }

}
