export interface EfaEnvironment {
  production: boolean;
  host: string;
  port: number;
  useNearestAddress: boolean;
  radiusInKilometers: number;
  maxFutureDaysInCalendar: number;
  maxPastDaysInCalendar: number;
  customerDirectory: string;
  showJourneyResultMap: boolean;
}
