import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';

import { BookingCreateInterface, BookingInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(
    private readonly apiService: ApiService
  ) { }

  public create(booking: BookingCreateInterface): Observable<BookingInterface> {
    return this.apiService.post(`bookings`, booking);
  }

  public update(uuid: string, booking: BookingCreateInterface): Observable<BookingInterface> {
    return this.apiService.put(`bookings/${uuid}`, booking);
  }

  public getByUuid(uuid: string): Observable<BookingInterface> {
    return this.apiService.get(`bookings/${uuid}`);
  }
}
