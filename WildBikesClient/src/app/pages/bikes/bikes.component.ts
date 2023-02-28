import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard as ClipboardService, ClipboardModule } from '@angular/cdk/clipboard';

import { Observable, takeUntil } from 'rxjs';

import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, RowClickedEvent, SelectionChangedEvent } from 'ag-grid-community';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import {
  BikeInterface,
  BikesService,
  BikeDetailsFormComponent
} from '@features/bikes';
import { DestroyService } from '@core/services';
import { LoadingSpinnerComponent, TemplateRendererComponent } from '@shared/components';

@Component({
  selector: 'app-bikes',
  standalone: true,
  imports: [
    CommonModule,
    ClipboardModule,

    AgGridModule,

    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    LoadingSpinnerComponent,
    BikeDetailsFormComponent
  ],
  providers: [
    DestroyService
  ],
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss']
})
export class BikesComponent implements OnInit {
  @ViewChild('controlsTemplate', { static: true }) controlsTemplate!: TemplateRef<any>;
  bikes$ = this.bikesService.data$;
  isLoading$ = this.bikesService.isLoading$;

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  columnDefs!: ColDef[];
  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  gridOptions = {
    suppressRowClickSelection: true,
    rowHeight: 48
  };

  selected: BikeInterface[] = [];

  constructor(
    @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bikesService: BikesService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setCoumnDefs();
    this.updateBikes();
  }

  setCoumnDefs(): void {
    this.columnDefs = [
      {
        field: 'id',
        headerCheckboxSelection: true,
        checkboxSelection: true,
      },
      { field: 'name' },
      { field: 'number' },
      { field: 'brand' },
      { field: 'model' },
      { 
        field: 'purchaseDate',
        valueFormatter: params => {
          const value = new Date(params.value);
          return value.toDateString();
        }
      },
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
    this.openDetails()
  }

  onDeleteClicked() {
    this.deleteMany(this.selected);
    this.resetSelected();
  }

  onRowDeleteClicked(bike: BikeInterface): void {
    this.deleteMany([bike]);
  }

  onRowClicked(bike: BikeInterface): void {
    this.openDetails(bike);
  }

  onRowEditClicked(bike: BikeInterface): void {
    this.openDetails(bike);
  }

  onDetailsSave(bike: BikeInterface): void {
    if (bike.id) {
      this.bikesService.update(bike, bike.id)
        .subscribe({
          next: () => this.updateBikes()
        });
    }
    else {
      this.bikesService.create(bike)
        .subscribe();
    }
  }

  resetSelected(): void {
    this.selected = [];
  }

  openDetails(bike?: BikeInterface): void {
    const dialogRef = this.dialog.open(BikeDetailsFormComponent, { maxHeight: '80vh', width: '80vw', maxWidth: '500px' });
    const instance = dialogRef.componentInstance;

    instance.bike = bike;
    instance.saveEvent.subscribe(b => {
      dialogRef.close();
      this.onDetailsSave(b);
    });
  }

  updateBikes(): void {
    this.bikesService.loadAll()
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe();
  }

  deleteMany(bike: BikeInterface[]): void {
    this.bikesService.deleteMany(bike.map(b => b.id))
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe({
        next: () => this.updateBikes()
      });
  }
}
