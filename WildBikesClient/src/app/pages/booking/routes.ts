import { Route } from '@angular/router';
import { DetailsComponent } from './details';
import { BookingRoutingEnum } from './enums';

export const BOOKING_ROUTES: Route[] = [
  {
    path: BookingRoutingEnum.Details,
    component: DetailsComponent
  }
];