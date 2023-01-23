import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { DocumentInterface, SigningInterface } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class SigningService {
    constructor(
        private readonly apiService: ApiService
    ) { }

    public sign(signing: SigningInterface): Observable<void> {
        return this.apiService.post(`api/booking/signing`, signing);
    }

    public document(bookingUuid: string): Observable<DocumentInterface> {
        return this.apiService.get(`api/Booking/Document/${bookingUuid}`);
    }
}
