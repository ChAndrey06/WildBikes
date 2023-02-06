import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { BookingsApi } from '../api';
import { BookingsState } from '../states';
import { BookingCreateInterface, BookingReadInterface } from '../interfaces';
import { IsLoadingHelper } from '@core/helpers';

@Injectable({
  providedIn: 'root'
})
export class BookingsService extends IsLoadingHelper {
  public readonly data$ = this.bookingsState.data$;

  constructor(
    private readonly bookingsApi: BookingsApi,
    private readonly bookingsState: BookingsState
  ) {
    super();
  }

  public updateAll(): Observable<BookingReadInterface[]> {
    this.requestStarted();

    return this.bookingsApi.getAll()
      .pipe(
        tap(() => this.requestCompleted()),
        tap((data) => this.bookingsState.set(data)),
      );
  }

  public deleteMany(uuids: string[]): Observable<unknown> {
    this.requestStarted();

    return this.bookingsApi.deleteMany(uuids)
      .pipe(
        tap(() => this.requestCompleted()),
        tap(() => uuids.forEach(u => this.bookingsState.removeItemById(u)))
      );
  }

  public create(booking: BookingCreateInterface): Observable<BookingReadInterface> {
    this.requestStarted();

    return this.bookingsApi.create(booking)
      .pipe(
        tap(() => this.requestCompleted())
      );
  }

  public update(booking: BookingCreateInterface, uuid: string): Observable<BookingReadInterface> {
    this.requestStarted();

    return this.bookingsApi.update(uuid, booking)
      .pipe(
        tap(() => this.requestCompleted())
      );
  }

  public createOrUpdate(booking: BookingCreateInterface, uuid: string | null): Observable<BookingReadInterface> {
    if (uuid) return this.update(booking, uuid)
    return this.create(booking);
  }

  public getByUuid(uuid: string): Observable<BookingReadInterface> {
    this.requestStarted();

    return this.bookingsApi.getByUuid(uuid)
      .pipe(
        tap(() => this.requestCompleted())
      );
  }
}