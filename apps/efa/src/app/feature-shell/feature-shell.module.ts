import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureShellComponent } from './feature-shell.component';
import { FeatureJourneySearchModule } from '../feature-journey-search/feature-journey-search.module';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FeatureShellComponent
  ],
  exports: [
    FeatureShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeatureShellRoutingModule,
    FeatureJourneySearchModule
  ]
})
export class FeatureShellModule {
}
