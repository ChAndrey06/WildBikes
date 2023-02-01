import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BookingsRouteParamEnum, SigningService } from '@features/bookings';
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
  @ViewChild(SignaturePadComponent) signaturePadComponent!: SignaturePadComponent;

  isLoading: boolean = false;
  isSigned: boolean = false;
  bookingUuid = this.activatedRoute.snapshot.paramMap.get(BookingsRouteParamEnum.BookingUuid) as string;
  document!: SafeHtml;

  email: string | null = null;
  sendToEmail: boolean = true;

  constructor(
    private readonly signingService: SigningService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadDocument();
    document.body.style.minWidth = "850px";
  }

  onSave(): void {
    const signature = this.signaturePadComponent.getSignatureAndClear();
    this.signBooking(signature);
  }

  onClear(): void {
    this.signaturePadComponent.clear();
  }

  loadDocument(): void {
    this.isLoading = true;
    this.signingService.document(this.bookingUuid)
      .subscribe(data => {
        this.document = this.sanitizer.bypassSecurityTrustHtml(data.document);
        this.isSigned = data.isSigned;
        this.isLoading = false;
      });
  }

  signBooking(signature: string): void {
    this.isLoading = true;
    this.signingService.sign(this.bookingUuid, {
      email: (this.email && this.sendToEmail) ? this.email : null,
      signature: signature
    }).subscribe(() => {
      this.loadDocument();
    });
  }
}
