import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PreloadAllModules, Route, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';


const routes: Route[] = [
  {
    path: 'booking/:isRoundTrip/:outwardJourneyId',
    loadChildren: () => import('./feature-booking/feature-booking.module').then(m => m.FeatureBookingModule)
  },
  {
    path: 'booking/:isRoundTrip/:outwardJourneyId/:backwardJourneyId',
    loadChildren: () => import('./feature-booking/feature-booking.module').then(m => m.FeatureBookingModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor() {
    registerLocaleData(localeDe);
  }
}
