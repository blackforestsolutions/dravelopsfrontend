import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
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
import { ThemeEmitterComponent } from './components/theme-emitter/theme-emitter.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { ScrollTopDirective } from './directives/scroll-top/scroll-top.directive';
import { IfTabletViewDirective } from './directives/if-tablet-view/if-tablet-view.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { IfTouchViewDirective } from './directives/if-touch-view/if-touch-view.directive';

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
  MatToolbarModule,
  MatDialogModule,
  MatRippleModule
];

const components = [
  ThemeEmitterComponent,
  LoadingComponent,
  FabButtonComponent,
  HeaderComponent
];

const directives = [
  ScrollTopDirective,
  IfTabletViewDirective,
  AutofocusDirective,
  IfTouchViewDirective
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
export class SharedModule {
}
