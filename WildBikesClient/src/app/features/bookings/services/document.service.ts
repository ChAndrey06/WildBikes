//   public get(uuid: string): Observable<BookingReadInterface> {
//     return this.bookingsApi.getByUuid(uuid);
//   }

//   public sign(uuid: string, signature: SignatureInterface): Observable<unknown> {
//     return this.bookingsApi.sign(uuid, signature);
//   }

//   public getDocument(uuid: string): Observable<DocumentInterface> {
//     return this.bookingsApi.getDocument(uuid);
//   }
// }

import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { BookingsApi } from '../api';
import { DocumentState } from '../states';
import { DocumentInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public readonly data$ = this.documentState.data$;

  constructor(
    private readonly bookingsApi: BookingsApi,
    private readonly documentState: DocumentState
  ) { }

  public update(bookingUuid: string): Observable<DocumentInterface> {
    return this.bookingsApi.getDocument(bookingUuid)
      .pipe(
        tap((data) => this.documentState.set(data)),
      );
  }
}