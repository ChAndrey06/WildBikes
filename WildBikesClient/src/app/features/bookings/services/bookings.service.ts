import { Injectable } from '@angular/core';

import { finalize, Observable, Subject, tap } from 'rxjs';

import { BookingsApi } from '../api';
import { BookingsState } from '../states';
import { BookingCreateInterface, BookingReadInterface } from '../interfaces';
import { IsLoadingHelper, Loadable } from '@core/helpers';
import { BikeInterface } from '@features/bikes';

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

  public loadAll(): Observable<BookingReadInterface[]> {
    this.requestStarted();

    return this.bookingsApi.getAll()
      .pipe(
        tap((data) => this.bookingsState.set(data)),
        finalize(() => this.requestCompleted())
      );
  }

  public deleteMany(uuids: string[]): Observable<unknown> {
    this.requestStarted();

    return this.bookingsApi.deleteMany(uuids)
      .pipe(
        tap(() => uuids.forEach(u => this.bookingsState.removeItemById(u))),
        finalize(() => this.requestCompleted()),
      );
  }

  public create(booking: BookingCreateInterface): Observable<BookingReadInterface> {
    this.requestStarted();

    return this.bookingsApi.create(booking)
      .pipe(
        finalize(() => this.requestCompleted())
      );
  }

  public update(booking: BookingCreateInterface, uuid: string): Observable<BookingReadInterface> {
    this.requestStarted();

    return this.bookingsApi.update(uuid, booking)
      .pipe(
        finalize(() => this.requestCompleted())
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
        finalize(() => this.requestCompleted())
      );
  }

  public searchBikes(query: string): Observable<BikeInterface[]> {
    return this.bookingsApi.searchBikes(query);
  }
}