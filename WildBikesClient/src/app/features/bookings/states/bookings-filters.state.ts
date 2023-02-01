import { Injectable } from '@angular/core';

import { NgxState, ObjectState } from 'ngx-base-state';

import { BookingsFiltersInterface } from '../interfaces';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class BookingsFiltersState extends ObjectState<BookingsFiltersInterface> { }
