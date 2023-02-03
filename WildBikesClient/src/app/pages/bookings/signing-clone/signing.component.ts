import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Observable } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookingsRouteParamEnum, DocumentInterface, DocumentService } from '@features/bookings';
import { SignaturePadComponent } from '@shared/components';

@Component({
  selector: 'app-signing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,

    SignaturePadComponent
  ],
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent {
  document$!: Observable<DocumentInterface | null>;
  bookingUuid = this.activatedRoute.snapshot.paramMap.get(BookingsRouteParamEnum.BookingUuid);
  @ViewChild(SignaturePadComponent) signaturePadComponent!: SignaturePadComponent;

  constructor(
    private readonly documentService: DocumentService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.document$ = this.documentService.data$;

    this.updateDocument();
  }

  updateDocument() {
    this.documentService.update(this.bookingUuid ?? '')
    .subscribe({});
  }

  onSave(): void {
  }

  onClear(): void {
    this.signaturePadComponent.clear();
  }
}
