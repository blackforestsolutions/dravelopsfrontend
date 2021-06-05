import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { CUSTOMER_DIRECTORY, HOST, MAX_FUTURE_DAYS_IN_CALENDAR, MAX_PAST_DAYS_IN_CALENDAR, PORT } from '../environments/config-tokens';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureShellModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    {
      provide: HOST,
      useValue: environment.host
    },
    {
      provide: PORT,
      useValue: environment.port
    },
    {
      provide: MAX_FUTURE_DAYS_IN_CALENDAR,
      useValue: environment.maxFutureDaysInCalendar
    },
    {
      provide: MAX_PAST_DAYS_IN_CALENDAR,
      useValue: environment.maxPastDaysInCalendar
    },
    {
      provide: CUSTOMER_DIRECTORY,
      useValue: environment.customerDirectory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(localeDe);
  }
}

