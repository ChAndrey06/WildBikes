import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '@features/booking/services';
import { BookingRouteParamEnum as Params } from '@pages/booking/enums';
import { SignaturePadComponent } from '@shared/components/signature-pad';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss']
})
export class SigningComponent implements OnInit {
  @ViewChild(SignaturePadComponent) signaturePadComponent!: SignaturePadComponent;

  isLoading: boolean = false;
  isSigned: boolean = false;
  bookingUuid = this.activatedRoute.snapshot.paramMap.get(Params.BookingUuid) as string;
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
    this.signingService.sign({
      uuid: this.bookingUuid,
      email: (this.email && this.sendToEmail) ? this.email : null,
      signature: signature
    }).subscribe(() => {
      this.loadDocument();
    });
  }
}
