import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokensInterface } from '../interfaces';
import { ApiService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly apiService: ApiService) { }

  login(login: string, password: string): Observable<TokensInterface> {
    return this.apiService.post(`api/user/login`, { login, password });
  }
}
