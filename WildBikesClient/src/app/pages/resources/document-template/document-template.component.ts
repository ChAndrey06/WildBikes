import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { SharedModule } from '@shared';
import { DocumentTemplateService } from '@features/resources/services';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-document-template',
  standalone: true,
  imports: [
    SharedModule,
    MonacoEditorModule,
    AngularEditorModule,
    HttpClientModule,
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
