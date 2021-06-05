import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureShellRoutingModule} from './feature-shell-routing.module';
import {FeatureShellComponent} from './feature-shell.component';
import {FeatureHeaderModule} from '../feature-header/feature-header.module';

@NgModule({
  declarations: [FeatureShellComponent],
  exports: [
    FeatureShellComponent
  ],
  imports: [
    CommonModule,
    FeatureShellRoutingModule,
    FeatureHeaderModule
  ]
})
export class FeatureShellModule {
}
