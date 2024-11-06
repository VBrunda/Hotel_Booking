import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingCalendarComponent } from './pages/booking-calendar/booking-calendar.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './guard/auth.guard';
import { AdminLayoutComponent } from './pages/admin-header/admin-header.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { UsersComponent } from './pages/users/users.component';
import { childAuthGuard } from './guard/child-auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, 
    canActivate: [authGuard],
    children: [
    { path: 'home', component: DashboardComponent },
    { path: 'calendar', component: BookingCalendarComponent },
    { path: 'newBooking', component: NewBookingComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'customers', component: CustomersComponent },
  ]},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [childAuthGuard],
    data: {expectedRole: "admin"},
    children:[
      {path: 'bookings', component: BookingsComponent},
      {path: 'users', component: UsersComponent},
      // { path: '', redirectTo: '/users', pathMatch: 'full' }
    ]
  },
  {path: 'unauthorized', component: UnauthorizedComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }