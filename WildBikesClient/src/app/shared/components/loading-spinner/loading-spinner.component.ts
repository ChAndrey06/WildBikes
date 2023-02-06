import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    CommonModule,

    MatProgressSpinnerModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() isLoading$!: BehaviorSubject<boolean>;
}
