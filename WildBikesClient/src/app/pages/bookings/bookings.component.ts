import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BookingReadInterface, BookingsRoutingEnum, BookingsService, BookingTableComponent } from '@features/bookings';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,

    BookingTableComponent
  ],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookingsService: BookingsService
  ) { }

  bookings$!: Observable<BookingReadInterface[] | null>;
  columnDefs: { field: keyof BookingReadInterface }[] = [
    { field: 'id' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'phone' },
    { field: 'price' },
    { field: 'passport' },
    { field: 'licenseNumber' },
    { field: 'nationality' },
    { field: 'helmet' },
    { field: 'bikeName' },
  ]

  ngOnInit(): void {
    this.bookings$ = this.bookingsService.data$;

    this.updateFilmsIfAbsent();
  }

  updateFilmsIfAbsent(): void {
    this.bookingsService.updateAllIfAbsent()
      .subscribe();
  }

  onBookingClicked(booking: BookingReadInterface) {
    this.router.navigate([booking.uuid, BookingsRoutingEnum.Details], { relativeTo: this.activatedRoute });
  }
}
