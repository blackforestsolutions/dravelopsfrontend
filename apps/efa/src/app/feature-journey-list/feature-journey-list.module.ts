import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FootpathMapComponent } from './footpath-map/footpath-map.component';
import { JourneyListComponent } from './journey-list/journey-list.component';
import { JourneyListItemComponent } from './journey-list-item/journey-list-item.component';
import { LegListComponent } from './leg-list/leg-list.component';
import { LegListItemComponent } from './leg-list-item/leg-list-item.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { DurationPipe } from './pipes/duration-pipe/duration.pipe';
import { VehicleTypePipe } from './pipes/vehicle-type-pipe/vehicle-type.pipe';
import { FeatureJourneyListRoutingModule } from './feature-journey-list-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BackwardJourneyFilterPipe } from './pipes/backward-journey-filter-pipe/backward-journey-filter.pipe';
import { FilterEqualJourneysPipe } from './pipes/filter-equal-journey-pipe/filter-equal-journeys.pipe';
import { JourneyListBackwardComponent } from './journey-list-backward/journey-list-backward.component';
import { JourneyListOutwardComponent } from './journey-list-outward/journey-list-outward.component';
import { SortJourneyPipe } from './pipes/sort-journey-pipe/sort-journey.pipe';
import { IsJourneyInPastPipe } from './pipes/is-journey-in-past-pipe/is-journey-in-past.pipe';
import { JourneyListService } from './services/journey-list.service';
import { IsOnlyFootpathPipe } from './pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { SharedStylesModule } from '@dravelopsfrontend/shared-styles';
import { GeoJsonPipe } from './pipes/geo-json-pipe/geo-json.pipe';
import { MapOptionsPipe } from './pipes/map-options-pipe/map-options.pipe';
import { NoJourneyResultComponent } from './no-journey-result/no-journey-result.component';
import { JourneyListHeaderComponent } from './journey-list-header/journey-list-header.component';


@NgModule({
  declarations: [
    FootpathMapComponent,
    JourneyListComponent,
    JourneyListItemComponent,
    LegListComponent,
    LegListItemComponent,
    VehicleTypeComponent,
    DurationPipe,
    VehicleTypePipe,
    BackwardJourneyFilterPipe,
    FilterEqualJourneysPipe,
    JourneyListOutwardComponent,
    JourneyListBackwardComponent,
    SortJourneyPipe,
    IsJourneyInPastPipe,
    IsOnlyFootpathPipe,
    GeoJsonPipe,
    MapOptionsPipe,
    NoJourneyResultComponent,
    JourneyListHeaderComponent
  ],
  providers: [
    JourneyListService,
    DatePipe,
    FilterEqualJourneysPipe,
    BackwardJourneyFilterPipe,
    SortJourneyPipe,
    IsJourneyInPastPipe,
    IsOnlyFootpathPipe
  ],
  imports: [
    CommonModule,
    FeatureJourneyListRoutingModule,
    SharedStylesModule,
    LeafletModule
  ]
})
export class FeatureJourneyListModule {
}
