import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@core/enums/app-route.enum';

const routes: Routes = [
  {
    path: AppRouteEnum.Booking,
    loadChildren: () => import('./pages/booking').then((m) => m.BookingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
