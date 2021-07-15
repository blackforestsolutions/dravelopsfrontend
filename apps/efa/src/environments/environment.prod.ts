import { EfaEnvironment } from './efa-environment';

export const environment: EfaEnvironment = {
  production: false,
  host: 'localhost',
  port: 8085,
  useNearestAddress: true,
  radiusInKilometers: 5,
  maxFutureDaysInCalendar: 365,
  maxPastDaysInCalendar: 0,
  customerDirectory: 'hvv',
  showJourneyResultMap: true
};
