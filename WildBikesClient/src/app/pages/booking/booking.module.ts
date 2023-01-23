import { NgModule } from '@angular/core';
import { BookingComponent } from './booking.component';
import { SharedModule } from '@shared';
import { BookingRouting } from './booking.routing';

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    SharedModule,
    BookingRouting
  ]
})
export class BookingModule { }
