import { Injectable } from '@angular/core';

import { finalize, Observable, tap } from 'rxjs';

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
        tap((data) => this.documentState.set(data)),
        finalize(() => this.requestCompleted())
      );
  }

  public sign(bookingUuid: string, signature: SignatureInterface): Observable<unknown> {
    this.requestStarted();

    return this.bookingsApi.sign(bookingUuid, signature)
      .pipe(
        finalize(() => this.requestCompleted())
      );
  }
}