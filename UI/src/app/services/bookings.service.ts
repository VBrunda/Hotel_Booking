import { Injectable } from '@angular/core';
import { CustomersService } from './customers.service';
import { RoomsService } from './rooms.service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  url = "http://127.0.0.1:5000/bookings";

  private bookingSubject = new BehaviorSubject<any>({});
  currentBooking = this.bookingSubject.asObservable();

  constructor(private http: HttpClient, private custService: CustomersService, private roomService: RoomsService, private loginService: LoginService) { }

  async newBooking(bookingDetails: any) {
    const { name, mobileNo, email, aadharNo, city, address, selectedRoomName, roomId, bookingFromDate, bookingToDate, narration, guestDetails } = bookingDetails;

    const newCustomer: any = { custId: 0, name, mobileNo, email, aadharNo, city, address };
    const roomDetails: any[] = [{ name: selectedRoomName, roomId, isAvailable: false }];
    let newBookingDetails: any = { roomId, bookingFromDate, bookingToDate, narration, guestDetails };
    //customerId, createdDate, createdBy
    try {
      // Create an array of promises for both API calls
      const customerPromise = firstValueFrom(this.custService.addUpdateCustomer(newCustomer));//returns Observables, use .toPromise()
      const roomPromise = this.roomService.addUpdateRooms(roomDetails);

      // Await both promises concurrently
      const [customerResponse, roomResponse]: any = await Promise.all([customerPromise, roomPromise]);

      // const allOk = responses.every(response => response.success);
      if (!(customerResponse.success && roomResponse.success)) {
        throw new Error('One or more requests failed');
      }

      // Handle additional logic for created time and serving here, if needed
      newBookingDetails = {
        bookingId: 0,
        custId: customerResponse.data.custId,
        createdDate: new Date(),
        createBy: this.loginService.getLoggedInUser().userId,
        ...newBookingDetails
      }

    } catch (error: any) {
      // Handle errors from either API call
      alert(error.message);
      console.error('Error in new booking:', error.message);
    }
  }

  async bookRoom(booking: any) {
    // return this.http.post(`${this.url}/bookRoom`, booking);
    try {
      const bookings = await fetch(`${this.url}/bookRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });
      return await bookings.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Rethrow for component handling
    }
  }

  async getBookingsByMonth(month:number, year:number) {
    try {
      const bookings = await fetch(`${this.url}/getBookingsByMonth?month=${month}&year=${year}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await bookings.json();
    } catch (error) {
      console.error('Fetch Error: ', error);
      throw error;
    }
  }

  bookingData(data: any) {   
    this.bookingSubject.next(data);
  }

}
