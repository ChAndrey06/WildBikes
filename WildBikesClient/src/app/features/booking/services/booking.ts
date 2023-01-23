import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { BookingCreateInterface, BookingInterface } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(
        private readonly apiService: ApiService
    ) { }

    public create(booking: BookingCreateInterface): Observable<BookingInterface> {
        return this.apiService.post(`api/booking`, booking);
    }

    public update(uuid: string, booking: BookingCreateInterface): Observable<BookingInterface> {
        return this.apiService.put(`api/booking/${uuid}`, booking);
    }

    public getByUuid(uuid: string): Observable<BookingInterface> {
        return this.apiService.get(`api/booking/${uuid}`);
    }
}
