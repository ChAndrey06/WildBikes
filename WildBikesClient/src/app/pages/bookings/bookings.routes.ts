import { Route } from '@angular/router';
import { BookingsComponent } from '.';

import { DetailsComponent } from './details';
import { SigningComponent } from './signing';

import { BookingsRouteParamEnum, BookingsRoutingEnum } from '@features/bookings';

export const BOOKINGS_ROUTES: Route[] = [
  {
    path: '',
    component: BookingsComponent
  },
  {
    path: BookingsRoutingEnum.New,
    component: DetailsComponent
  },
  {
    path: `:${BookingsRouteParamEnum.BookingUuid}/${BookingsRoutingEnum.Details}`,
    component: DetailsComponent
  },
  {
    path: `:${BookingsRouteParamEnum.BookingUuid}/${BookingsRoutingEnum.Signing}`,
    component: SigningComponent
  }
];