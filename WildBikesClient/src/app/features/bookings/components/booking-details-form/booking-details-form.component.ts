import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { BookingCreateInterface, BookingInterface } from '@features/bookings';

@Component({
  selector: 'app-booking-details-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './booking-details-form.component.html',
  styleUrls: ['./booking-details-form.component.scss']
})
export class BookingDetailsFormComponent implements OnChanges {
  @Output() saveEvent = new EventEmitter<BookingCreateInterface>();
  @Input() booking!: BookingInterface;

  helmets = ['No', '1', '2'];

  formGroup: FormGroup = this.formBuilder.group({
    'firstName': [null, Validators.required],
    'lastName': [null, Validators.required],
    'dateFrom': [null, Validators.required],
    'dateTo': [null, Validators.required],
    'price': [null, Validators.required],
    'passport': [null, Validators.required],
    'licenseNumber': [null, Validators.required],
    'address': [null, Validators.required],
    'nationality': [null, Validators.required],
    'helmet': [null, Validators.required],
    'bikeName': [null, Validators.required],
    'bikeNumber': [null, [Validators.required, Validators.maxLength(10)]],
    'bikeId': [null, Validators.required],
    'phone': [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['booking']) {
      this.formGroup.patchValue(this.booking);
    }
  }

  onSubmit(booking: BookingCreateInterface) {
    this.saveEvent.emit(booking);
  }

  testFunc() {
    console.log('test func was called');
  }
}