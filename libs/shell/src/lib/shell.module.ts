import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FeatureShellModule } from './feature-shell/feature-shell.module';
import {
  AppEnvironment,
  HEADER_TITLE,
  HOST,
  MAX_FUTURE_DAYS_IN_CALENDAR,
  MAX_PAST_DAYS_IN_CALENDAR,
  MAX_TRAVEL_POINTS_IN_SMALL_VIEW,
  PORT,
  RADIUS_IN_KILOMETERS,
  SHOW_JOURNEY_RESULT_MAP,
  USE_NEAREST_ADDRESS
} from '@dravelopsfrontend/shared';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeDe from '@angular/common/locales/de';

@NgModule({
  imports: [
    CommonModule,
    FeatureShellModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    FeatureShellModule
  ]
})
export class ShellModule {

  constructor() {
    registerLocaleData(localeDe);
  }

  public static forRoot(environment: AppEnvironment): ModuleWithProviders<ShellModule> {
    return {
      ngModule: ShellModule,
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
          provide: HEADER_TITLE,
          useValue: environment.headerTitle
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
          provide: USE_NEAREST_ADDRESS,
          useValue: environment.useNearestAddress
        },
        {
          provide: RADIUS_IN_KILOMETERS,
          useValue: environment.radiusInKilometers
        },
        {
          provide: SHOW_JOURNEY_RESULT_MAP,
          useValue: environment.showJourneyResultMap
        },
        {
          provide: MAX_TRAVEL_POINTS_IN_SMALL_VIEW,
          useValue: environment.maxTravelPointsInSmallView
        }
      ]
    };
  }
}
