import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';

import { DocumentInterface, SignatureInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SigningService {
  constructor(
    private readonly apiService: ApiService
  ) { }

  public sign(bookingUuid: string, signing: SignatureInterface): Observable<void> {
    return this.apiService.post(`bookings/${bookingUuid}/sign`, signing);
  }

  public document(bookingUuid: string): Observable<DocumentInterface> {
    return this.apiService.get(`bookings/${bookingUuid}/document`);
  }
}
