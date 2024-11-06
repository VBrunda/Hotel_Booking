import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { UsersComponent } from './pages/users/users.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { BookingCalendarComponent } from './pages/booking-calendar/booking-calendar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { UniquePipe } from './pipes/unique.pipe';
import { AdminLayoutComponent } from './pages/admin-header/admin-header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    RoomsComponent,
    NewBookingComponent,
    BookingCalendarComponent,
    CustomersComponent,
    AdminLayoutComponent,
    BookingsComponent,
    UsersComponent,
    UniquePipe,
    PageNotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
