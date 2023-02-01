import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { TokensInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly apiService: ApiService) { }

  login(login: string, password: string): Observable<TokensInterface> {
    return this.apiService.post(`user/login`, { login, password });
  }
}
