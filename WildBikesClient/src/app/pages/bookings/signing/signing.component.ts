import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable, takeUntil } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { DestroyService, ToastService } from '@core/services';
import { BookingsRouteParamEnum, DocumentInterface, DocumentService } from '@features/bookings';
import { SignaturePadComponent, LoadingSpinnerComponent, ShareCardComponent } from '@shared/components';

@Component({
  selector: 'app-signing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,

    ShareCardComponent,
    SignaturePadComponent,
    LoadingSpinnerComponent
  ],
  providers: [
    DestroyService
  ],
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent {
  @ViewChild(SignaturePadComponent) signaturePadComponent!: SignaturePadComponent;
  @ViewChild('shareDialog', { static: true }) shareDialog!: TemplateRef<any>;

  document$ = this.documentService.data$;
  isLoading$ = this.documentService.isLoading$;
  bookingUuid = this.activatedRoute.snapshot.paramMap.get(BookingsRouteParamEnum.BookingUuid);

  signFormGroup: FormGroup = this.formBuilder.group({
    'email': [null, Validators.email],
    'sendToEmail': [true, Validators.required]
  });

  constructor(
    @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
    private readonly toast: ToastService,
    private readonly documentService: DocumentService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateDocument();
  }

  updateDocument() {
    this.documentService.update(this.bookingUuid!)
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe();
  }

  onSign({ email, sendToEmail }: SigningFormInterface): void {
    if (!sendToEmail) email = null;
    
    const signature = {
      signature: this.signaturePadComponent.getSignatureAndClear(),
      email: email
    }

    this.documentService.sign(this.bookingUuid!, signature)
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe({
        next: () => {
          this.updateDocument();
          this.toast.open('Document signed!');
        }
      });
  }

  onClear(): void {
    this.signaturePadComponent.clear();
  }

  onShareClick(): void {
    this.dialog.open(this.shareDialog);
  }

  getHtml(document: DocumentInterface) {
    return this.sanitizer.bypassSecurityTrustHtml(document.document);
  }

  get locationHref(): string {
    return location.href;
  }
}

interface SigningFormInterface {
  email: string | null,
  sendToEmail: boolean
}