import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { BookingCreateInterface, BookingInterface } from '@features/booking/interfaces';

@Component({
  selector: 'app-booking-details-form',
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
    'bikeID': [null, Validators.required],
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
}
