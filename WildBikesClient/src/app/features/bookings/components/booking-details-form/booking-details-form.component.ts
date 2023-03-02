import { CommonModule } from '@angular/common';
import { DestroyService } from '@core/services';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Observable, takeUntil } from 'rxjs';

import { DateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { Loadable } from '@core/helpers';
import { BikeInterface } from '@features/bikes';
import { BookingCreateInterface, BookingReadInterface, BookingsService } from '@features/bookings';

@Component({
  selector: 'app-booking-details-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './booking-details-form.component.html',
  styleUrls: ['./booking-details-form.component.scss']
})
export class BookingDetailsFormComponent implements OnInit, OnChanges {
  @Output() saveEvent = new EventEmitter<BookingCreateInterface>();
  @Input() booking!: BookingReadInterface;
  helmets = ['No', '1', '2'];
  bikes = new Loadable<BikeInterface[]>([], false);

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
    'phone': [null, Validators.required],
    'resetSignature': [false],
  });

  constructor(
    @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
    private readonly formBuilder: FormBuilder,
    private readonly bookingsService: BookingsService,
  ) { }

  get isSigned() {
    return Boolean(this.booking?.signature)
  }

  ngOnInit(): void {
    this.updateBikes();
    this.bikeNumeSubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['booking']) {
      this.formGroup.reset(this.booking);

      const resetSignature = this.formGroup.get('resetSignature');
      if (this.isSigned) resetSignature?.enable();
      else resetSignature?.disable();
    }
  }

  onSubmit(form: any) {
    if (form.resetSignature) form.signature = '';

    this.saveEvent.emit(form as BookingCreateInterface);
  }

  onBikeSelected(event: MatAutocompleteSelectedEvent): void {
    const bike = event.option.value;
    this.formGroup.patchValue({
      bikeId: bike.id,
      bikeName: bike.name,
      bikeNumber: bike.number
    });
  }

  updateBikes(filter?: string) {
    this.bikes.isLoading = true;
    this.bookingsService.searchBikes(filter ?? '')
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe({
        next: data => this.bikes.setData(data),
        error: error => this.bikes.setError(error)
      });
  }

  bikeNumeSubscribe(): void {
    const bikeNumeFC = this.formGroup.get('bikeName');

    bikeNumeFC && bikeNumeFC.valueChanges
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe(value => {
        this.updateBikes(value);
      });
  }

  onClearBikeNameClicked(): void {
    this.formGroup.patchValue({ bikeName: '' });
  }
}