import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {JourneySearchComponent} from './journey-search/journey-search.component';
import {StartpageComponent} from './startpage/startpage.component';
import {SharedModule} from '../shared/shared.module';
import {JourneySearchFormComponent} from './journey-search-form/journey-search-form.component';
import {MapSearchComponent} from './map-search/map-search.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {SharedStylesModule} from "@dravelopsfrontend/shared-styles";
import { NearestTravelPointListComponent } from './nearest-travel-point-list/nearest-travel-point-list.component';
import { NearestTravelPointListItemComponent } from './nearest-travel-point-list-item/nearest-travel-point-list-item.component';
import { MapOptionsPipe } from './pipes/map-options-pipe/map-options.pipe';
import { PolygonPipe } from './pipes/polygon-pipe/polygon.pipe';


@NgModule({
  declarations: [
    JourneySearchComponent,
    StartpageComponent,
    JourneySearchFormComponent,
    MapSearchComponent,
    NearestTravelPointListComponent,
    NearestTravelPointListItemComponent,
    MapOptionsPipe,
    PolygonPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SharedStylesModule,
    LeafletModule
  ],
  exports: [JourneySearchComponent]
})
export class FeatureJourneySearchModule {
}
