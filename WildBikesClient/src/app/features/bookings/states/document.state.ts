import { Injectable } from '@angular/core';

import { ObjectState, NgxState } from 'ngx-base-state';

import { DocumentInterface } from '../interfaces';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class DocumentState extends ObjectState<DocumentInterface> {  }
