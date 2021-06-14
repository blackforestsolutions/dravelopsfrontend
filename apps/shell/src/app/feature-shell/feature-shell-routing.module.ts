import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('efa/Module').then(m => m.FeatureShellModule)
  },
  {
    path: 'booking/:isRoundTrip/:outwardJourneyId',
    loadChildren: () => import('booking/Module').then(m => m.FeatureBookingModule)
  },
  {
    path: 'booking/:isRoundTrip/:outwardJourneyId/:backwardJourneyId',
    loadChildren: () => import('booking/Module').then(m => m.FeatureBookingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureShellRoutingModule { }
