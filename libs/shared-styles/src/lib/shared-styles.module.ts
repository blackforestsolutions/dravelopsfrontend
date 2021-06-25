import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ThemeEmitterComponent } from './components/theme-emitter/theme-emitter.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollTopDirective } from './directives/scroll-top/scroll-top.directive';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatTimepickerModule } from 'mat-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatRadioModule,
  MatButtonModule,
  MatTimepickerModule,
  MatSelectModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatBottomSheetModule,
  MatCardModule,
  MatToolbarModule
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
    ...modules
  ],
  declarations: [
    ...components,
    ...directives
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }
    }
  ],
  exports: [
    ...modules,
    ...components,
    ...directives
  ]
})
export class SharedStylesModule {
}
