import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';

import { BookingReadInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsApi {
  constructor(
    private readonly apiService: ApiService
  ) { }

  public get(uuid: string): Observable<BookingReadInterface> {
    return this.apiService.get<BookingReadInterface>(`bookings/${uuid}`);
  }

  public getAll(): Observable<BookingReadInterface[]> {
    return this.apiService.get<BookingReadInterface[]>(`bookings`);
  }

  public delete(uuid: string): Observable<unknown> {
    return this.apiService.delete(`bookings/${uuid}`);
  }
}
