import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AppRouteEnum } from '@core/enums';
import {
  BookingReadInterface,
  BookingCreateInterface,
  BookingsRoutingEnum,
  BookingsRouteParamEnum,
  BookingDetailsFormComponent,
  BookingsService,
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
    MatSnackBarModule,

    BookingDetailsFormComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  bookingUuid: string | null;
  booking!: BookingReadInterface;

  constructor(
    private readonly bookingService: BookingsService,
    private readonly activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    // private readonly router: Router
  ) {
    this.bookingUuid = this.activatedRoute.snapshot.paramMap.get(BookingsRouteParamEnum.BookingUuid);
  }

  ngOnInit(): void {
    if (this.bookingUuid) {
      this.loadBooking(this.bookingUuid);
    }
  }

  onSave(booking: BookingCreateInterface): void {
    this.bookingService.createOrUpdate(booking, this.booking?.uuid).subscribe({
      next: (booking) => {
        this.snackBar.open('Saved!', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 1000,
          panelClass: 'snackbar'
        });
        this.booking = booking;
        // this.router.navigateByUrl(this.bookingSigningRoute);
      }
    });
  }

  loadBooking(uuid: string): void {
    this.bookingService.getByUuid(uuid).subscribe({
      next: booking => this.booking = booking
    });
  }

  get bookingSignUrl(): string {
    return this.booking ? `${location.origin}/${this.bookingSigningRoute}` : '';
  }

  get bookingSigningRoute() {
    return `${AppRouteEnum.Bookings}/${BookingsRoutingEnum.Signing}/${this.booking.uuid}`;
  }
}
