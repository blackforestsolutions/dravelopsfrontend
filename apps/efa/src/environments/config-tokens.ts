import { InjectionToken } from '@angular/core';

export const HOST = new InjectionToken<string>('host');
export const PORT = new InjectionToken<number>('port');
export const MAX_FUTURE_DAYS_IN_CALENDAR = new InjectionToken<number>('maxFutureDaysInCalendar');
export const MAX_PAST_DAYS_IN_CALENDAR = new InjectionToken<number>('maxPastDaysInCalendar');
export const CUSTOMER_DIRECTORY = new InjectionToken<string>('customerDirectory');
