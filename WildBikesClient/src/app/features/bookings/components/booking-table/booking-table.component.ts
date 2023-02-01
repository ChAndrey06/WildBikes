import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { ColumnApi, GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';

import { BookingReadInterface } from '@features/bookings';

@Component({
  selector: 'app-booking-table',
  standalone: true,
  imports: [
    CommonModule,

    AgGridModule
  ],
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss']
})
export class BookingTableComponent {
  @Input() columnDefs: { field: keyof BookingReadInterface }[] = [];
  @Input() bookings!: BookingReadInterface[] | null;
  @Output() bookingClicked = new EventEmitter<BookingReadInterface>();

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  defaultColDef = {
    resizable: true,
  };

  overlayLoadingTemplate = '<span>Please wait while your rows are loading</span>';
  overlayNoRowsTemplate = `<span>This is a custom 'no rows' overlay</span>`;

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(): void {
    this.gridColumnApi.autoSizeAllColumns();
  }

  onRowClicked(event: RowClickedEvent): void {
    this.bookingClicked.emit(event.data);
  }
}
