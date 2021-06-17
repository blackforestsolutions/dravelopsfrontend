import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureShellComponent } from './feature-shell.component';
import { FeatureJourneySearchModule } from '../feature-journey-search/feature-journey-search.module';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  CUSTOMER_DIRECTORY,
  MAX_FUTURE_DAYS_IN_CALENDAR,
  MAX_PAST_DAYS_IN_CALENDAR,
  RADIUS_IN_KILOMETERS,
  USE_NEAREST_ADDRESS
} from '../../environments/config-tokens';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    FeatureShellComponent
  ],
  exports: [
    FeatureShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeatureShellRoutingModule,
    FeatureJourneySearchModule
  ],
  providers: [
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
      provide: CUSTOMER_DIRECTORY,
      useValue: environment.customerDirectory
    }
  ]
})
export class FeatureShellModule {
}
