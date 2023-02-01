import { NgModule } from '@angular/core';

import { AppRouteEnum } from '@core/enums';
import { AuthGuardService } from '@features/user';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@pages/home';
import { SigningComponent } from '@pages/bookings';
import { BookingsRouteParamEnum, BookingsRoutingEnum } from '@features/bookings';

const routes: Routes = [
  {
    path: AppRouteEnum.Home,
    component: HomeComponent
  },
  {
    path: AppRouteEnum.User,
    loadChildren: () => import('./pages/user').then(m => m.USER_ROUTES)
  },
  {
    path: `${AppRouteEnum.Bookings}/:${BookingsRouteParamEnum.BookingUuid}/${BookingsRoutingEnum.Signing}`,
    component: SigningComponent
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: AppRouteEnum.Bookings,
        loadChildren: () => import('./pages/bookings').then(m => m.BOOKINGS_ROUTES),
      },
      {
        path: AppRouteEnum.Resources,
        loadChildren: () => import('./pages/resources').then(m => m.RESOURCES_ROUTES)
      },
    ]
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