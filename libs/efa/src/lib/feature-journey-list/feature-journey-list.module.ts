import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FootpathMapComponent } from './footpath-map/footpath-map.component';
import { JourneyListComponent } from './journey-list/journey-list.component';
import { JourneyListItemComponent } from './journey-list-item/journey-list-item.component';
import { LegListComponent } from './leg-list/leg-list.component';
import { LegListItemComponent } from './leg-list-item/leg-list-item.component';
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
import { SharedModule } from '@dravelopsfrontend/shared';
import { GeoJsonPipe } from './pipes/geo-json-pipe/geo-json.pipe';
import { MapOptionsPipe } from './pipes/map-options-pipe/map-options.pipe';
import { NoJourneyResultComponent } from './no-journey-result/no-journey-result.component';
import { JourneyListHeaderComponent } from './journey-list-header/journey-list-header.component';
import { JourneyMapComponent } from './journey-map/journey-map.component';
import { VehicleTypeIconPipe } from './pipes/vehicle-type-icon-pipe/vehicle-type-icon.pipe';
import { WalkStepListComponent } from './walk-step-list/walk-step-list.component';
import { WalkStepArrowIconPipe } from './pipes/walk-step-arrow-icon-pipe/walk-step-arrow-icon.pipe';
import { WalkStepDescriptionPipe } from './pipes/walk-step-description-pipe/walk-step-description.pipe';
import { CompassDirectionPipe } from './pipes/compass-direction-pipe/compass-direction.pipe';
import { WalkingDirectionPipe } from './pipes/walking-direction-pipe/walking-direction.pipe';
import { OriginPointPipe } from './pipes/origin-point-pipe/origin-point.pipe';
import { DestinationPointPipe } from './pipes/destination-point-pipe/destination-point.pipe';
import { IntermediateStopsListComponent } from './intermediate-stops-list/intermediate-stops-list.component';


@NgModule({
  declarations: [
    FootpathMapComponent,
    JourneyListComponent,
    JourneyListItemComponent,
    LegListComponent,
    LegListItemComponent,
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
    JourneyListHeaderComponent,
    JourneyMapComponent,
    VehicleTypeIconPipe,
    WalkStepListComponent,
    WalkStepArrowIconPipe,
    WalkStepDescriptionPipe,
    CompassDirectionPipe,
    WalkingDirectionPipe,
    OriginPointPipe,
    DestinationPointPipe,
    VehicleTypeIconPipe,
    IntermediateStopsListComponent
  ],
  providers: [
    JourneyListService,
    DatePipe,
    FilterEqualJourneysPipe,
    BackwardJourneyFilterPipe,
    SortJourneyPipe,
    IsJourneyInPastPipe,
    IsOnlyFootpathPipe,
    VehicleTypePipe,
    WalkingDirectionPipe,
    OriginPointPipe,
    DestinationPointPipe,
    CompassDirectionPipe
  ],
  imports: [
    CommonModule,
    FeatureJourneyListRoutingModule,
    SharedModule,
    LeafletModule
  ]
})
export class FeatureJourneyListModule {
}
