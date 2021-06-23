import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ThemeEmitterComponent } from './components/theme-emitter/theme-emitter.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollTopDirective } from './directives/scroll-top/scroll-top.directive';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule
];

const components = [
  ThemeEmitterComponent,
  LoadingComponent,
  FabButtonComponent
];

const directives = [
  ScrollTopDirective
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  declarations: [
    ...components,
    ...directives
  ],
  exports: [
    ...components,
    ...directives
  ]
})
export class SharedStylesModule {
}
