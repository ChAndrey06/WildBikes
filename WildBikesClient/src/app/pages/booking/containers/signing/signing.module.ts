import { NgModule } from '@angular/core';
import { SigningComponent } from './signing.component';
import { SharedModule } from '@shared';
import { SigningRouting } from './signing.routing';

@NgModule({
  declarations: [
    SigningComponent
  ],
  imports: [
    SharedModule,
    SigningRouting
  ]
})
export class SigningModule { }
