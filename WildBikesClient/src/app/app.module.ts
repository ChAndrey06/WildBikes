import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenKeysEnum } from '@features/user/enums';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    MonacoEditorModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(TokenKeysEnum.Access)
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
