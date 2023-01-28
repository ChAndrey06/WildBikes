import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wild-bikes';
  editorOptions = {theme: 'vs-dark', language: 'html'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
