import { RouterModule, Routes } from '@angular/router';
import { JourneyListComponent } from './journey-list/journey-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: JourneyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureJourneyListRoutingModule {
}
