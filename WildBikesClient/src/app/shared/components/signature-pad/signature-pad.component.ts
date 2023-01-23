import { Component, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import SignaturePad, { SignatureEvent } from "signature_pad";

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  canvasContext: CanvasRenderingContext2D | null = null;

  sig!: SignaturePad;
  padWinth = 828;
  padHeight = 262;

  signatureCoordsDefault = {
    minX: this.padWinth,
    minY: this.padHeight,
    maxX: 0,
    maxY: 0
  };

  signatureCoords = this.signatureCoordsDefault;

  ngOnInit() {
    this.sig = new SignaturePad(this.canvas.nativeElement);
    this.sig.addEventListener("beforeUpdateStroke", (e) => {
      this.onUpdateStroke(e);
    }, { once: false });
  }

  ngAfterViewInit(): void {
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
  }

  public getSignatureAndClear(): string {
    const signature = this.getSignature();
    this.clear();

    return signature;
  }

  public getSignature(): string {
    const imageData = this.canvasContext?.getImageData(
      this.signatureCoords.minX - 5,
      this.signatureCoords.minY - 5,
      this.signatureCoords.maxX - this.signatureCoords.minX + 10,
      this.signatureCoords.maxY - this.signatureCoords.minY + 10
    );

    const canvas: HTMLCanvasElement = document.createElement("CANVAS") as HTMLCanvasElement;
    const canvasContext: CanvasRenderingContext2D | null = canvas.getContext('2d');

    canvas.width = imageData?.width ?? this.padWinth;
    canvas.height = imageData?.height ?? this.padHeight;

    if (imageData) canvasContext?.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
  }

  public clear(): void {
    this.sig.clear();
    this.signatureCoords = this.signatureCoordsDefault;
  }

  onUpdateStroke(e: any): void {
    e = e.detail;
    let { minX, minY, maxX, maxY } = this.signatureCoords;

    if (e.offsetX > maxX) maxX = e.offsetX;
    if (e.offsetX < minX) minX = e.offsetX;
    if (e.offsetY > maxY) maxY = e.offsetY;
    if (e.offsetY < minY) minY = e.offsetY;

    this.signatureCoords = { minX, minY, maxX, maxY };
  }
}
