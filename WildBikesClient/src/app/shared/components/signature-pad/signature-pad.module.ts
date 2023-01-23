import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturePadComponent } from './signature-pad.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SignaturePadComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    SignaturePadComponent
  ]
})
export class SignaturePadModule { }
