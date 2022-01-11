export interface AppEnvironment {
  production: boolean;
  host: string;
  port: number;
  headerTitle: string,
  useNearestAddress: boolean;
  radiusInKilometers: number;
  maxFutureDaysInCalendar: number;
  maxPastDaysInCalendar: number;
  showJourneyResultMap: boolean;
  maxTravelPointsInSmallView: number;
}
