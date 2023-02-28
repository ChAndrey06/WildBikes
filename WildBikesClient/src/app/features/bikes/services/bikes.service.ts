import { Injectable } from '@angular/core';

import { finalize, Observable, tap } from 'rxjs';

import { BikesApi } from '../api';
import { BikesState } from '../states';
import { BikeInterface } from '../interfaces';
import { IsLoadingHelper } from '@core/helpers';

@Injectable({
  providedIn: 'root'
})
export class BikesService extends IsLoadingHelper {
  public readonly data$ = this.bikesState.data$;

  constructor(
    private readonly bikesApi: BikesApi,
    private readonly bikesState: BikesState
  ) {
    super();
  }

  public loadAll(): Observable<BikeInterface[]> {
    this.requestStarted();

    return this.bikesApi.getAll()
      .pipe(
        tap(data => this.bikesState.set(data)),
        finalize(() => this.requestCompleted())
      );
  }

  public deleteMany(ids: number[]): Observable<unknown> {
    this.requestStarted();

    return this.bikesApi.deleteMany(ids)
      .pipe(
        tap(() => ids.forEach(i => this.bikesState.removeItemById(i))),
        finalize(() => this.requestCompleted())
      );
  }

  public create(bike: BikeInterface): Observable<BikeInterface> {
    this.requestStarted();

    return this.bikesApi.create(bike)
      .pipe(
        tap(b => this.bikesState.pushItem(b)),
        finalize(() => this.requestCompleted())
      );
  }

  public update(bike: BikeInterface, id: number): Observable<BikeInterface> {
    this.requestStarted();

    return this.bikesApi.update(id, bike)
      .pipe(
        finalize(() => this.requestCompleted())
      );
  }

  public createOrUpdate(bike: BikeInterface, id: number | null): Observable<BikeInterface> {
    if (id) return this.update(bike, id)
    return this.create(bike);
  }

  public getById(id: number): Observable<BikeInterface> {
    this.requestStarted();

    return this.bikesApi.get(id)
      .pipe(
        finalize(() => this.requestCompleted())
      );
  }
}