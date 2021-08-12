import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureShellComponent } from './feature-shell.component';
import { FeatureJourneySearchModule } from '../feature-journey-search/feature-journey-search.module';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { HOST, PORT, SharedModule } from '@dravelopsfrontend/shared';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { createGraphQlConnection } from '../domain/util/api-connection';
import { HttpLink } from 'apollo-angular/http';

@NgModule({
  declarations: [
    FeatureShellComponent
  ],
  exports: [
    FeatureShellComponent
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createGraphQlConnection,
      deps: [HttpLink, HOST, PORT]
    }
  ],
  imports: [
    CommonModule,
    FeatureShellRoutingModule,
    FeatureJourneySearchModule,
    SharedModule
  ]
})
export class FeatureShellModule {
}
