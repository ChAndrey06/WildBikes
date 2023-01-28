import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@features/user/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInterface, TokensInterface } from '@features/user';
import { TokenKeysEnum } from '@features/user/enums';
import { Router } from '@angular/router';

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
  formGroup: FormGroup = this.formBuilder.group({
    'userName': [null, Validators.required],
    'password': [null, Validators.required]
  });

  constructor(
    private readonly authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private readonly router: Router
  ) {  }

  onLoginSubmit(login: LoginInterface) {
    this.authService.login(login.userName, login.password).subscribe({
      next: (tokens: TokensInterface) => {
        localStorage.setItem(TokenKeysEnum.Access, tokens.accessToken);
        localStorage.setItem(TokenKeysEnum.Refresh, tokens.refreshToken);

        alert('Logged in');
        
        this.router.navigate(['/']);
      },
      error: () => alert('Failed to login')
    });
  }
}
