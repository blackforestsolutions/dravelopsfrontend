import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {ThemeEmitterComponent} from './components/theme-emitter/theme-emitter.component';
import {LoadingComponent} from './components/loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const materialModules = [
  MatButtonModule,
  MatProgressSpinnerModule
];

const components = [
  ThemeEmitterComponent,
  LoadingComponent
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class SharedStylesModule {
}
