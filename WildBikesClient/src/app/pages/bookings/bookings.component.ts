import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard as ClipboardService, ClipboardModule } from '@angular/cdk/clipboard';

import { Observable, takeUntil } from 'rxjs';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  BookingReadInterface,
  BookingsRoutingEnum,
  BookingsService,
  BookingTableComponent
} from '@features/bookings';
import { DestroyService } from '@core/services';
import { LoadingSpinnerComponent, TemplateRendererComponent } from '@shared/components';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    ClipboardModule,

    AgGridModule,

    MatButtonModule,
    MatIconModule,

    BookingTableComponent,
    LoadingSpinnerComponent
  ],
  providers: [
    DestroyService
  ],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  @ViewChild('controlsTemplate', { static: true }) controlsTemplate!: TemplateRef<any>;
  bookings$ = this.bookingsService.data$;
  isLoading$ = this.bookingsService.isLoading$;

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  columnDefs!: ColDef[];
  defaultColDef = {
    resizable: true,
    autoHeight: true
  };
  gridOptions = {
    suppressRowClickSelection: true
  };

  selected: BookingReadInterface[] = [];

  constructor(
    @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookingsService: BookingsService,
    private readonly clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
    this.setCoumnDefs();
    this.updateBookings();
  }

  setCoumnDefs(): void {
    this.columnDefs = [
      {
        field: 'id',
        headerCheckboxSelection: true,
        checkboxSelection: true,
      },
      { field: 'firstName' },
      { field: 'lastName' },
      { field: 'phone' },
      { field: 'price' },
      { field: 'passport' },
      { field: 'licenseNumber' },
      { field: 'nationality' },
      { field: 'helmet' },
      { field: 'bikeName' },
      {
        headerName: 'Controls',
        pinned: 'right',
        cellRenderer: TemplateRendererComponent,
        cellRendererParams: {
          template: this.controlsTemplate
        }
      }
    ]
  }

  updateBookings(): void {
    this.bookingsService.updateAll()
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(): void {
    this.gridColumnApi.autoSizeAllColumns();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selected = event.api.getSelectedRows();
  }

  onNewClicked() {
    this.router.navigate([BookingsRoutingEnum.Details], { relativeTo: this.activatedRoute });
  }

  onDeleteClicked() {
    this.deleteMany(this.selected);
    this.resetSelected();
  }

  onRowDeleteClicked(booking: BookingReadInterface): void {
    this.deleteMany([booking]);
  }

  onRowEditClicked(booking: BookingReadInterface): void {
    this.router.navigate([BookingsRoutingEnum.Details, booking.uuid], { relativeTo: this.activatedRoute });
  }

  onRowCopyClicked(event: MouseEvent, booking: BookingReadInterface) {
    const url = this.router.createUrlTree([BookingsRoutingEnum.Signing, booking.uuid], { relativeTo: this.activatedRoute }).toString();
    this.clipboardService.copy(`${location.origin}/${url}`);
  }

  deleteMany(bookings: BookingReadInterface[]): void {
    this.bookingsService.deleteMany(bookings.map(b => b.uuid))
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe();
  }

  resetSelected(): void {
    this.selected = [];
  }
}