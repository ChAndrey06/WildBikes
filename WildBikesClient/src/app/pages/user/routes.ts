import { Route } from '@angular/router';

import { UserRoutingEnum } from '@features/user';
import { LoginComponent } from './login';

export const USER_ROUTES: Route[] = [
  {
    path: UserRoutingEnum.Login,
    component: LoginComponent
  }
];