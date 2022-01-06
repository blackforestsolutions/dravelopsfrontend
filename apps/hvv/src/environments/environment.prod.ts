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
  showJourneyResultMap: true,
  maxTravelPointsInSmallView: 5
};
