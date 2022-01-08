import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JourneySearchComponent } from './journey-search/journey-search.component';
import { StartpageComponent } from './startpage/startpage.component';
import { JourneySearchFormComponent } from './journey-search-form/journey-search-form.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '@dravelopsfrontend/shared';
import { MapOptionsPipe } from './pipes/map-options-pipe/map-options.pipe';
import { PolygonPipe } from './pipes/polygon-pipe/polygon.pipe';
import { TravelPointSearchComponent } from './travel-point-search/travel-point-search.component';
import { AutocompleteAddressSearchComponent } from './autocomplete-address-search/autocomplete-address-search.component';
import { TravelPointListComponent } from './travel-point-list/travel-point-list.component';
import { TravelPointListItemComponent } from './travel-point-list-item/travel-point-list-item.component';
import { DistanceInMetresPipe } from './pipes/distance-in-metres-pipe/distance-in-metres.pipe';
import { NearestTravelPointSearchComponent } from './nearest-travel-point-search/nearest-travel-point-search.component';
import { TravelPointSearchTitlePipe } from './pipes/travel-point-search-title/travel-point-search-title.pipe';
import { TravelPointTouchFilterPipe } from './pipes/travel-point-touch-filter-pipe/travel-point-touch-filter-.pipe';
import { TravelPointSearchNoResultMessagePipe } from './pipes/travel-point-search-no-result-message-pipe/travel-point-search-no-result-message.pipe';
import { JourneySearchFormContainerComponent } from './journey-search-form-container/journey-search-form-container.component';

@NgModule({
  declarations: [
    JourneySearchComponent,
    StartpageComponent,
    JourneySearchFormComponent,
    MapSearchComponent,
    MapOptionsPipe,
    PolygonPipe,
    TravelPointSearchComponent,
    AutocompleteAddressSearchComponent,
    TravelPointListComponent,
    TravelPointListItemComponent,
    DistanceInMetresPipe,
    NearestTravelPointSearchComponent,
    TravelPointSearchTitlePipe,
    TravelPointTouchFilterPipe,
    TravelPointSearchNoResultMessagePipe,
    JourneySearchFormContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    LeafletModule
  ],
  exports: [JourneySearchComponent]
})
export class FeatureJourneySearchModule {
}
