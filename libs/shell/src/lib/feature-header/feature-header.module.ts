import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@dravelopsfrontend/shared';

@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ]
})
export class FeatureHeaderModule {
}
