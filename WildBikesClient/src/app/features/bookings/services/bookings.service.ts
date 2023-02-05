import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { BookingsApi } from '../api';
import { BookingsState } from '../states';
import { BookingCreateInterface, BookingReadInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  public readonly data$ = this.bookingsState.data$;

  constructor(
    private readonly bookingsApi: BookingsApi,
    private readonly bookingsState: BookingsState
  ) { }

  public updateAll(): Observable<BookingReadInterface[]> {
    return this.bookingsApi.getAll()
      .pipe(
        tap((data) => this.bookingsState.set(data)),
      );
  }

  public deleteMany(uuids: string[]): Observable<unknown> {
    return this.bookingsApi.deleteMany(uuids)
      .pipe(
        tap(() => uuids.forEach(u => this.bookingsState.removeItemById(u)))
      );
  }

  public create(booking: BookingCreateInterface): Observable<BookingReadInterface> {
    return this.bookingsApi.create(booking);
  }

  public update(booking: BookingCreateInterface, uuid: string): Observable<BookingReadInterface> {
    return this.bookingsApi.update(uuid, booking);
  }

  public createOrUpdate(booking: BookingCreateInterface, uuid: string | null): Observable<BookingReadInterface> {
    if (uuid) return this.update(booking, uuid)
    return this.create(booking);
  }

  public getByUuid(uuid: string): Observable<BookingReadInterface> {
    return this.bookingsApi.getByUuid(uuid);
  }
}