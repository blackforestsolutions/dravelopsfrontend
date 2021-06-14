export interface EfaEnvironment {
  production: boolean;
  host: string;
  port: number;
  radiusInKilometers: number;
  maxFutureDaysInCalendar: number;
  maxPastDaysInCalendar: number;
  customerDirectory: string;
}
