import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { BookingsApi } from '../api';
import { BookingsState } from '../states';
import { BookingReadInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  public readonly data$ = this.bookingsState.data$;

  constructor(
    private readonly bookingsApi: BookingsApi,
    private readonly bookingsState: BookingsState
  ) { }

  public get(uuid: string): Observable<BookingReadInterface> {
    return this.bookingsApi.get(uuid);
  }

  public updateAllIfAbsent(): Observable<BookingReadInterface[] | null> {
    if (!this.bookingsState.data) {
      return this.updateAll();
    }

    return this.data$;
  }

  public updateAll(): Observable<BookingReadInterface[]> {
    return this.bookingsApi.getAll()
      .pipe(
        tap((data) => this.bookingsState.set(data)),
      );
  }

  public delete(uuid: string): Observable<unknown> {
    return this.bookingsApi.delete(uuid)
      .pipe(
        tap(() => this.bookingsState.removeItemById(uuid))
      );
  }
}