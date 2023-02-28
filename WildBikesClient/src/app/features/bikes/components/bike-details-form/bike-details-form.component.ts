import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Output, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { BikeInterface } from '@features/bikes/interfaces';

@Component({
  selector: 'app-bike-details-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule
  ],  
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './bike-details-form.component.html',
  styleUrls: ['./bike-details-form.component.scss']
})
export class BikeDetailsFormComponent implements OnChanges, OnInit {
  @Output() saveEvent = new EventEmitter<BikeInterface>();
  @Input() bike?: BikeInterface;

  formGroup: FormGroup = this.formBuilder.group({
    'name': [null, [Validators.required, Validators.maxLength(50)]],
    'number': [null, [Validators.required, Validators.maxLength(10)]],
    'brand': [null, [Validators.required, Validators.maxLength(20)]],
    'model': [null, [Validators.required, Validators.maxLength(20)]],
    'purchaseDate': [null, Validators.required] 
  });

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bike']) {
      this.resetForm()
    }
  }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form: any) {
    this.saveEvent.emit({ ...this.bike, ...form});
  }

  resetForm(): void {
    this.formGroup.reset(this.bike);
  }
}
