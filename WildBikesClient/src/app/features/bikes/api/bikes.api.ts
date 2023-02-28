import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';

import { BikeInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BikesApi {
  constructor(
    private readonly apiService: ApiService
  ) { }

  public get(id: number): Observable<BikeInterface> {
    return this.apiService.get<BikeInterface>(`bikes/${id}`);
  }

  public getAll(): Observable<BikeInterface[]> {
    return this.apiService.get(`bikes`);
  }

  public create(bike: BikeInterface): Observable<BikeInterface> {
    return this.apiService.post(`bikes`, bike);
  }

  public update(id: number, bike: BikeInterface): Observable<BikeInterface> {
    return this.apiService.put(`bikes/${id}`, bike);
  }

  public delete(id: number): Observable<unknown> {
    return this.apiService.delete(`bikes/${id}`);
  }

  public deleteMany(ids: number[]): Observable<unknown> {
    return this.apiService.post(`bikes/delete-many`, ids);
  }
}
