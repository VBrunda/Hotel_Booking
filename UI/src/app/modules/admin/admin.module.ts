import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from '../../pages/admin-header/admin-header.component';
import { BookingsComponent } from '../../pages/bookings/bookings.component';
import { UsersComponent } from '../../pages/users/users.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
