import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'booking/:isRoundTrip/:outwardJourneyId',
    loadChildren: () => import('@dravelopsfrontend/booking').then(m => m.BookingModule)
  },
  {
    path: 'booking/:isRoundTrip/:outwardJourneyId/:backwardJourneyId',
    loadChildren: () => import('@dravelopsfrontend/booking').then(m => m.BookingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class FeatureShellRoutingModule {
}
