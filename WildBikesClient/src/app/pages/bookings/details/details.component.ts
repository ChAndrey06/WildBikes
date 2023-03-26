import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Observable, takeUntil } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRouteEnum } from '@core/enums';
import { DestroyService, ToastService } from '@core/services';
import {
  BookingReadInterface,
  BookingCreateInterface,
  BookingsRoutingEnum,
  BookingsRouteParamEnum,
  BookingDetailsFormComponent,
  BookingsService,
} from '@features/bookings';
import { LoadingSpinnerComponent } from '@shared/components';

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

    BookingDetailsFormComponent,
    LoadingSpinnerComponent
  ],
  providers: [
    DestroyService
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  bookingUuid: string | null;
  booking!: BookingReadInterface;
  isLoading$ = this.bookingService.isLoading$;

  constructor(
    @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
    private readonly bookingService: BookingsService,
    private readonly route: ActivatedRoute,
    private toast: ToastService,
    // private readonly router: Router
  ) {
    this.bookingUuid = this.route.snapshot.paramMap.get(BookingsRouteParamEnum.BookingUuid);
  }

  ngOnInit(): void {
    if (this.bookingUuid) {
      this.loadBooking(this.bookingUuid);
    }
  }

  onSave(booking: BookingCreateInterface): void {
    this.bookingService.createOrUpdate(booking, this.booking?.uuid)
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe({
        next: (booking) => {
          this.toast.open('Saved');
          this.booking = booking;
          // this.router.navigateByUrl(this.bookingSigningRoute);
        }
      });
  }

  loadBooking(uuid: string): void {
    this.bookingService.getByUuid(uuid)
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe({
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
