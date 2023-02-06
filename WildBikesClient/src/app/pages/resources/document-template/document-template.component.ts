import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { DocumentTemplateService } from '@features/resources';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-document-template',
  standalone: true,
  imports: [
    FormsModule,

    MonacoEditorModule,

    MatButtonModule
  ],
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.scss']
})
export class DocumentTemplateComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'razor' };
  oldTemplate = '';
  template = '';

  constructor(private readonly service: DocumentTemplateService) {  }

  ngOnInit(): void {
    this.service.get().subscribe(({ template }) => {
      this.oldTemplate = this.template = template;
    });
  }

  onReset(): void {
    this.template = this.oldTemplate;
  }

  onSave(): void {
    this.service.update(this.template).subscribe(() => {
      this.oldTemplate = this.template;
    });
  }
}
