import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { AppRoutingModule } from './app-routing.module';
import { HOST, PORT } from '../environments/config-tokens';
import { environment } from '../environments/environment';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import {createGraphQlConnection} from "@dravelopsfrontend/generated-content";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureShellModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de',
    },
    {
      provide: HOST,
      useValue: environment.host,
    },
    {
      provide: PORT,
      useValue: environment.port,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createGraphQlConnection,
      deps: [HttpLink, HOST, PORT],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
