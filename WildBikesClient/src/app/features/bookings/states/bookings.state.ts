import { Injectable } from '@angular/core';

import { ArrayState, NgxState } from 'ngx-base-state';

import { BookingReadInterface } from '../interfaces';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class BookingsState extends ArrayState<BookingReadInterface> {
  protected override getItemId(booking: BookingReadInterface): string {
    return booking.uuid;
  }
}
