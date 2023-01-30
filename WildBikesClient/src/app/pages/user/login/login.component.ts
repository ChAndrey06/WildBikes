import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@features/user/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface, TokensInterface } from '@features/user';
import { TokenKeysEnum } from '@features/user/enums';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedModule } from '@shared';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError = false;
  formGroup: FormGroup = this.formBuilder.group({
    'login': [null, Validators.required],
    'password': [null, Validators.required]
  });

  constructor(
    private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  onLoginSubmit(login: LoginInterface) {
    this.authService.login(login.login, login.password).subscribe({
      next: (tokens: TokensInterface) => {
        localStorage.setItem(TokenKeysEnum.Access, tokens.accessToken);
        localStorage.setItem(TokenKeysEnum.Refresh, tokens.refreshToken);

        console.log(localStorage.getItem(TokenKeysEnum.Access));

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loginError = true;
        this.formGroup.reset();
      }
    });
  }
}
