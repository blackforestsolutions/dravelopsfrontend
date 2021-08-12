import { AppEnvironment } from '@dravelopsfrontend/shared';

export const environment: AppEnvironment = {
  production: true,
  host: 'localhost',
  port: 8085,
  headerTitle: 'Für alle in Bewegung',
  useNearestAddress: true,
  radiusInKilometers: 5,
  maxFutureDaysInCalendar: 365,
  maxPastDaysInCalendar: 0,
  showJourneyResultMap: true
};
