import {InjectionToken} from "@angular/core";

export interface AppEnvironmnet {
  production: boolean,
  headerTitle: string,
  customerDirectory: string;
}

export const HEADER_TITLE = new InjectionToken<string>('headerTitle');
export const CUSTOMER_DIRECTORY = new InjectionToken<string>('customerDirectory');
