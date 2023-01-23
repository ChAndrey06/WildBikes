import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
import { SharedModule } from '@shared';
import { DetailsRouting } from './details.routing';
import { FeaturesModule } from '@features';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    SharedModule,
    DetailsRouting,
    FeaturesModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class DetailsModule { }
