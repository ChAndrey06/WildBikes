import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplateService {
  constructor(
    private readonly apiService: ApiService
  ) { }

  public get(): Observable<{ template: string }> {
    return this.apiService.get(`api/resources/document-template`);
  }

  public update(template: string): Observable<void> {
    return this.apiService.post(`api/resources/document-template`, { template });
  }
}
