import { Route } from '@angular/router';
import { LoginComponent } from './login';
import { UserRoutingEnum } from './enums';

export const USER_ROUTES: Route[] = [
  {
    path: UserRoutingEnum.Login,
    component: LoginComponent
  }
];