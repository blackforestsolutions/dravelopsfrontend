export interface EfaEnvironment {
  production: boolean | string;
  host: string;
  port: number | string;
  maxFutureDaysInCalendar: number | string;
  maxPastDaysInCalendar: number | string;
  customerDirectory: string;
}
