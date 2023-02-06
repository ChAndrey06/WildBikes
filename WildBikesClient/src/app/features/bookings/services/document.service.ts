import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { BookingsApi } from '../api';
import { DocumentState } from '../states';
import { DocumentInterface, SignatureInterface } from '../interfaces';
import { IsLoadingHelper } from '@core/helpers';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends IsLoadingHelper {
  public readonly data$ = this.documentState.data$;

  constructor(
    private readonly bookingsApi: BookingsApi,
    private readonly documentState: DocumentState
  ) {
    super();
  }

  public update(bookingUuid: string): Observable<DocumentInterface> {
    this.requestStarted();

    return this.bookingsApi.getDocument(bookingUuid)
      .pipe(
        tap(() => this.requestCompleted()),
        tap((data) => this.documentState.set(data)),
      );
  }

  public sign(bookingUuid: string, signature: SignatureInterface): Observable<unknown> {
    this.requestStarted();

    return this.bookingsApi.sign(bookingUuid, signature)
      .pipe(
        tap(() => this.requestCompleted())
      );
  }
}