import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureShellRoutingModule } from './feature-shell-routing.module';
import { FeatureShellComponent } from './feature-shell.component';
import { EfaModule } from '@dravelopsfrontend/efa';
import { SharedModule } from '@dravelopsfrontend/shared';

@NgModule({
  declarations: [FeatureShellComponent],
  exports: [
    FeatureShellComponent
  ],
  imports: [
    CommonModule,
    EfaModule,
    FeatureShellRoutingModule,
    SharedModule
  ]
})
export class FeatureShellModule {
}
