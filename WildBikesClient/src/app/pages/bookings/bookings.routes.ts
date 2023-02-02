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
    path: BookingsRoutingEnum.Details,
    component: DetailsComponent
  },
  {
    path: `${BookingsRoutingEnum.Details}/:${BookingsRouteParamEnum.BookingUuid}`,
    component: DetailsComponent
  },
  {
    path: `${BookingsRoutingEnum.Signing}/:${BookingsRouteParamEnum.BookingUuid}`,
    component: SigningComponent
  },
];