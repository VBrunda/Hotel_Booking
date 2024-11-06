import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { BookingsService } from '../../services/bookings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrl: './booking-calendar.component.css'
})
export class BookingCalendarComponent implements OnInit {
  currentDate: Date = new Date();
  daysInMonth: number[] = [];
  allRooms: any[] = [];
  bookingList: any[] = [];

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private bookingService: BookingsService, private roomService: RoomsService, private route:Router) { }

  ngOnInit(): void {
    this.generateDays();
    this.getRooms();
    this.getBookingByMonth(this.currentDate.getMonth() + 1, this.currentDate.getFullYear());
  }

  onFilterChange(date: Date) {
  }

  getRooms() {
    this.roomService.getAllRooms().then(response => {
      if (response.success) {
        this.allRooms = response.data;
      }
    });
  }

  checkBooking(day: number,roomNo: number) {
    const targetDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

    const isBooked = this.bookingList.find(m => {
      const bookingFrom = new Date(m.bookingFromDate);
      const bookingTo = new Date(m.bookingToDate);

      const normalizedBookingFrom = new Date(bookingFrom.getFullYear(), bookingFrom.getMonth(), bookingFrom.getDate());
      const normalizedBookingTo = new Date(bookingTo.getFullYear(), bookingTo.getMonth(), bookingTo.getDate());

      return m.room.roomId === roomNo &&
        targetDate >= normalizedBookingFrom && targetDate <= normalizedBookingTo;
    });

    return isBooked || false;
  }


  getBookingByMonth(month: number, year: number) {
    this.bookingService.getBookingsByMonth(month, year).then((response: any) => {
      if (response.success) {
        this.bookingList = response.data;
      }
    })
  }

  generateDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const noDaysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: noDaysInMonth }, (_, i) => i + 1);
  }

  changeMonth(direction: number) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.generateDays();
    this.getBookingByMonth(this.currentDate.getMonth() + 1, this.currentDate.getFullYear());
  }

  selectBooking(room:any, day:number){
    const booking = this.checkBooking(day, room.roomId);
    if(booking){
      this.bookingService.bookingData(booking);
      this.route.navigateByUrl('/admin/bookings');
    }else{
      const bookRoom = confirm(`Want to book room for ${room.roomId} for ${day} ${this.monthNames[this.currentDate.getMonth()]}`)
      if(bookRoom) {
        this.bookingService.bookingData({
          roomType: room.name, 
          roomNo: room.roomId,
          date: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
        });
        this.route.navigateByUrl('/newBooking');
      }
    }
  }
}
