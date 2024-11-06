import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../pages/admin-header/admin-header.component';
import { BookingsComponent } from '../../pages/bookings/bookings.component';
import { UsersComponent } from '../../pages/users/users.component';
import { PageNotFoundComponent } from '../../pages/page-not-found/page-not-found.component';

const routes: Routes = [{
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: 'bookings', component: BookingsComponent},
      {path: 'users', component: UsersComponent},
      { path: '', redirectTo: '/users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
