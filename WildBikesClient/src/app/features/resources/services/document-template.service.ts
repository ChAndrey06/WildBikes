import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {
  constructor(
    private readonly apiService: ApiService
  ) { }

  public get(): Observable<{ template: string }> {
    return this.apiService.get(`resources/document-template`);
  }

  public update(template: string): Observable<void> {
    return this.apiService.post(`resources/document-template`, { template });
  }
}
