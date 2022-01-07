import { InjectionToken } from '@angular/core';

export * from './lib/shared.module';
export * from './lib/configs/app-environment';
export * from './lib/components/fab-button/fab-button.component';
export * from './lib/components/loading/loading.component';
export * from './lib/components/theme-emitter/theme-emitter.component';
export * from './lib/directives/scroll-top/scroll-top.directive';
export * from './lib/directives/autofocus/autofocus.directive';
export * from './lib/components/header/header.component';

export const MIN_WGS_84_LONGITUDE = -180;
export const MAX_WGS_84_LONGITUDE = 180;
export const MIN_WGS_84_LATITUDE = -90;
export const MAX_WGS_84_LATITUDE = 90;
export const OSM_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const OSM_ZOOM_SNAP_LEVEL = 1.5;
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const MIN_SEARCH_TERM_LENGTH = 1;
export const DEBOUNCE_TIME = 50;
export const TOUCH_BREAKPOINT = 850;
export const TABLET_BREAKPOINT = 720;

export const HOST = new InjectionToken<string>('host');
export const PORT = new InjectionToken<number>('port');
export const HEADER_TITLE = new InjectionToken<string>('headerTitle');
export const USE_NEAREST_ADDRESS = new InjectionToken<boolean>('useNearestAddress');
export const RADIUS_IN_KILOMETERS = new InjectionToken<number>('radiusInKilometers');
export const MAX_FUTURE_DAYS_IN_CALENDAR = new InjectionToken<number>('maxFutureDaysInCalendar');
export const MAX_PAST_DAYS_IN_CALENDAR = new InjectionToken<number>('maxPastDaysInCalendar');
export const SHOW_JOURNEY_RESULT_MAP = new InjectionToken<string>('showJourneyResultMap');
export const MAX_TRAVEL_POINTS_IN_SMALL_VIEW = new InjectionToken<number>('maxTravelPointsInSmallView');
