import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingCreateInterface, BookingInterface } from '@features/booking';
import { BookingRouteParamEnum as Params, BookingRoutingEnum } from '@pages/booking/enums';
import { BookingService } from '@features/booking/services/booking';
import { AppRouteEnum } from '@core/enums/app-route.enum';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  bookingUuid: string | null;
  booking!: BookingInterface;

  constructor(
    private readonly bookingService: BookingService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { 
    this.bookingUuid = this.activatedRoute.snapshot.paramMap.get(Params.BookingUuid);
  }

  ngOnInit(): void {
    if (this.bookingUuid) {
      this.loadBooking(this.bookingUuid);
    }
  }

  onSave(booking: BookingCreateInterface): void {
    const afterSave = () => {
      this.router.navigateByUrl(this.bookingSignRoute);
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
    return this.booking ? `${location.origin}/${this.bookingSignRoute}` : '';
  }

  get bookingSignRoute() {
    return `${AppRouteEnum.Booking}/${BookingRoutingEnum.Signing}/${this.booking.uuid}`;
  }
}
