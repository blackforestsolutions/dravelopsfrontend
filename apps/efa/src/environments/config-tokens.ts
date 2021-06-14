import { InjectionToken } from '@angular/core';


export const OSM_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const HOST = new InjectionToken<string>('host');
export const PORT = new InjectionToken<number>('port');
export const RADIUS_IN_KILOMETERS = new InjectionToken<number>('radiusInKilometers');
export const MAX_FUTURE_DAYS_IN_CALENDAR = new InjectionToken<number>('maxFutureDaysInCalendar');
export const MAX_PAST_DAYS_IN_CALENDAR = new InjectionToken<number>('maxPastDaysInCalendar');
export const CUSTOMER_DIRECTORY = new InjectionToken<string>('customerDirectory');
