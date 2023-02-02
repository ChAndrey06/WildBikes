import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { getAccessToken } from '@core/helpers';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqWithToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    });

    return next.handle(reqWithToken);  
  }
}
