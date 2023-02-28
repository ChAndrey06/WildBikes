import { Injectable } from '@angular/core';

import { ArrayState, NgxState } from 'ngx-base-state';

import { BikeInterface } from '../interfaces';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class BikesState extends ArrayState<BikeInterface> { }
