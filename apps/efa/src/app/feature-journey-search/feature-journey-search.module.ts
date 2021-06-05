import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JourneySearchComponent } from './journey-search/journey-search.component';
import { StartpageComponent } from './startpage/startpage.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [JourneySearchComponent, StartpageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [JourneySearchComponent, StartpageComponent]
})
export class FeatureJourneySearchModule {
}
