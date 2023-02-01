import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenKeysEnum } from '@features/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface HttpClientGetOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  } | undefined;
  context?: HttpContext | undefined;
  observe?: "body" | undefined;
  params?: HttpParams;
  reportProgress?: boolean | undefined;
  responseType?: "json" | undefined;
  withCredentials?: boolean | undefined;
}

const options: HttpClientGetOptions = {
  headers: new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem(TokenKeysEnum.Access) ?? ''}`)
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public get hostUrl(): string {
    return environment.apiUrl;
  }

  constructor(
    private readonly httpService: HttpClient
  ) { }

  public get<T>(subUrl: string): Observable<T> {
    const url = this.getFullUrl(subUrl);
    return this.httpService.get<T>(url, options);
  }

  public post<T>(subUrl: string, data: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.post<T>(url, data, options);
  }

  public put<T>(subUrl: string, data: unknown): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.put<T>(url, data, options);
  }

  public delete<T>(subUrl: string): Observable<T> {
    const url = this.getFullUrl(subUrl);

    return this.httpService.delete<T>(url, options);
  }

  private getFullUrl(subUrl: string): string {
    return `${this.hostUrl}${subUrl}`;
  }
}
