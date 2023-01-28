import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@core/enums/app-route.enum';
import { AuthGuardService } from '@features/user';

const routes: Routes = [
  {
    path: AppRouteEnum.Booking,
    loadChildren: () => import('./pages/booking').then(m => m.BookingModule),
    canActivate : [AuthGuardService]
  },
  {
    path: AppRouteEnum.Resources,
    loadChildren: () => import('./pages/resources').then(m => m.RESOURCES_ROUTES)
  },
  {
    path: AppRouteEnum.User,
    loadChildren: () => import('./pages/user').then(m => m.USER_ROUTES)
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