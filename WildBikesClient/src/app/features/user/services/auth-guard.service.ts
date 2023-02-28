import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { catchError, map, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from '@core/services';
import { AppRouteEnum } from '@core/enums';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '@core/helpers';
import { UserRoutingEnum } from '../enums';
import { TokensInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly apiService: ApiService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)) {
      return true;
    }

    return this.apiService.post<TokensInterface>('token/refresh', { accessToken, refreshToken }).pipe(
      map(tokens => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        return true;
      }),
      catchError(() => {
        this.router.navigate([AppRouteEnum.User, UserRoutingEnum.Login], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }
}