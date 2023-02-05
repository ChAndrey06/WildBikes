import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, RowClickedEvent, SelectionChangedEvent } from 'ag-grid-community';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  BookingReadInterface,
  BookingsRoutingEnum,
  BookingsService,
  BookingTableComponent
} from '@features/bookings';
import { TemplateRendererComponent } from '@shared/components';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,

    AgGridModule,

    MatButtonModule,
    MatIconModule,

    BookingTableComponent,
  ],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  @ViewChild('controlsTemplate', { static: true }) controlsTemplate!: TemplateRef<any>;
  bookings$!: Observable<BookingReadInterface[] | null>;

  overlayLoadingTemplate = '<span>Please wait while your rows are loading</span>';
  overlayNoRowsTemplate = `<span>This is a custom 'no rows' overlay</span>`;

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  columnDefs!: ColDef[];
  defaultColDef = {
    resizable: true,
    autoHeight: true
  };

  selected: BookingReadInterface[] = [];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookingsService: BookingsService
  ) { }

  ngOnInit(): void {
    this.bookings$ = this.bookingsService.data$;
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

  onRowDeleteClicked(event: MouseEvent) {
    console.log(event);
  }

  onRowClicked(event: RowClickedEvent): void {
    this.router.navigate([BookingsRoutingEnum.Details, event.data.uuid], { relativeTo: this.activatedRoute });
  }

  deleteMany(bookings: BookingReadInterface[]): void {
    this.bookingsService.deleteMany(bookings.map(b => b.uuid))
      .subscribe();
  }

  resetSelected(): void {
    this.selected = [];
  }
}