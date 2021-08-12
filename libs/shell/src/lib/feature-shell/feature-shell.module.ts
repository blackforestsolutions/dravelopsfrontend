import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { FeatureShellComponent } from './feature-shell.component';
import { FeatureHeaderModule } from '../feature-header/feature-header.module';
import { EfaModule } from '@dravelopsfrontend/efa';

@NgModule({
  declarations: [FeatureShellComponent],
  exports: [
    FeatureShellComponent
  ],
  imports: [
    CommonModule,
    EfaModule,
    FeatureShellRoutingModule,
    FeatureHeaderModule
  ]
})
export class FeatureShellModule {
}
