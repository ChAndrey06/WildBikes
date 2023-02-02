import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRouteEnum } from '@core/enums';
import {
  BookingService,
  BookingInterface,
  BookingCreateInterface,
  BookingsRoutingEnum,
  BookingsRouteParamEnum,
  BookingDetailsFormComponent,
} from '@features/bookings';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatIconModule,
    ClipboardModule,
    MatInputModule,
    MatButtonModule,

    BookingDetailsFormComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  bookingUuid: string | null;
  booking!: BookingInterface;

  constructor(
    private readonly bookingService: BookingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.bookingUuid = this.activatedRoute.snapshot.paramMap.get(BookingsRouteParamEnum.BookingUuid);
  }

  ngOnInit(): void {
    if (this.bookingUuid) {
      this.loadBooking(this.bookingUuid);
    }
  }

  onSave(booking: BookingCreateInterface): void {
    const afterSave = () => {
      this.router.navigateByUrl(this.bookingSigningRoute);
    }

    if (this.booking) this.updateBooking(this.booking.uuid, booking, afterSave);
    else this.createBooking(booking, afterSave);
  }

  loadBooking(uuid: string): void {
    this.bookingService.getByUuid(uuid).subscribe(booking => {
      this.booking = booking;
    });
  }

  createBooking(booking: BookingCreateInterface, onResponce: () => void): void {
    this.bookingService.create(booking).subscribe(data => {
      this.booking = data;
      onResponce();
    });
  }

  updateBooking(uuid: string, booking: BookingCreateInterface, onResponce: () => void): void {
    this.bookingService.update(uuid, booking).subscribe(data => {
      this.booking = data;
      onResponce();
    });
  }

  get bookingSignUrl(): string {
    return this.booking ? `${location.origin}/${this.bookingSigningRoute}` : '';
  }

  get bookingSigningRoute() {
    return `${AppRouteEnum.Bookings}/${BookingsRoutingEnum.Signing}/${this.booking.uuid}`;
  }
}
