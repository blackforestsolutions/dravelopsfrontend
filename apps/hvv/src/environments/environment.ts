// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `app-environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AppEnvironment } from '@dravelopsfrontend/shared';

export const environment: AppEnvironment = {
  production: false,
  host: 'localhost',
  port: 8085,
  headerTitle: 'Komm gut nach Hause',
  useNearestAddress: true,
  radiusInKilometers: 5,
  maxFutureDaysInCalendar: 365,
  maxPastDaysInCalendar: 0,
  showJourneyResultMap: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
