import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    // necessary for having a correct url in WebBrowser
    // eslint-disable-next-line max-len
    path: ':isRoundTrip/:departureLatitude/:departureLongitude/:arrivalLatitude/:arrivalLongitude/:outwardJourneyDateTime/:outwardJourneyIsArrivalDateTime',
    loadChildren: () => import('../feature-journey-list/feature-journey-list.module').then(m => m.FeatureJourneyListModule)
  },
  {
    // necessary for having a correct url in WebBrowser
    // eslint-disable-next-line max-len
    path: ':isRoundTrip/:departureLatitude/:departureLongitude/:arrivalLatitude/:arrivalLongitude/:outwardJourneyDateTime/:outwardJourneyIsArrivalDateTime/:backwardJourneyDateTime/:backwardJourneyIsArrivalDateTime',
    loadChildren: () => import('../feature-journey-list/feature-journey-list.module').then(m => m.FeatureJourneyListModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureShellRoutingModule {
}
