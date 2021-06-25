import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedStylesModule } from '@dravelopsfrontend/shared-styles';

@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedStylesModule
  ]
})
export class FeatureHeaderModule { }
