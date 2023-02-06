import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@Component({
  selector: 'app-share-card',
  standalone: true,
  imports: [
    CommonModule,

    ShareButtonsModule,
    ShareIconsModule
  ],
  templateUrl: './share-card.component.html',
  styleUrls: ['./share-card.component.scss']
})
export class ShareCardComponent {
  @Input() url!: string;
}
