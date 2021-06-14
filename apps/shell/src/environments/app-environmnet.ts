import {InjectionToken} from "@angular/core";

export interface AppEnvironmnet {
  production: boolean,
  host: string,
  port: number,
  headerTitle: string,
  customerDirectory: string;
}

export const HOST = new InjectionToken<string>('host');
export const PORT = new InjectionToken<number>('port');
export const HEADER_TITLE = new InjectionToken<string>('headerTitle');
export const CUSTOMER_DIRECTORY = new InjectionToken<string>('customerDirectory');
