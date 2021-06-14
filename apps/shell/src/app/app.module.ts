import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import {
  CUSTOMER_DIRECTORY,
  HEADER_TITLE,
  HOST,
  PORT,
} from '../environments/app-environmnet';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createGraphQlConnection } from '@dravelopsfrontend/generated-content';

const routes: Route[] = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    FeatureShellModule,
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
      provide: HEADER_TITLE,
      useValue: environment.headerTitle,
    },
    {
      provide: CUSTOMER_DIRECTORY,
      useValue: environment.customerDirectory,
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
