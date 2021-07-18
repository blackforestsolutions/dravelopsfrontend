import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { JourneyFragment, LegFragment, TravelPointFragment } from '@dravelopsfrontend/generated-content';
import { CircleMarker, circleMarker, geoJSON, GeoJSON, Layer, Marker } from 'leaflet';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';
import { VehicleTypePipe } from '../pipes/vehicle-type-pipe/vehicle-type.pipe';
import { LeafletService } from '../../shared/util/leaflet.service';

const ICON_WIDTH = 31.25;
const ICON_HEIGHT = 51.25;

@Component({
  selector: 'dravelopsefafrontend-journey-map',
  templateUrl: './journey-map.component.html',
  styleUrls: ['./journey-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JourneyMapComponent {
  @Input() journey: JourneyFragment;
  @ViewChild('theme', { static: true }) themeEmitterRef: ThemeEmitterComponent;

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private readonly customerDirectory: string,
    private readonly leafletService: LeafletService,
    private readonly vehicleTypePipe: VehicleTypePipe
  ) {
  }

  buildDynamicLayers(): Layer[] {
    const waypointLayers: GeoJSON[] = this.createWaypointsLayer();
    const stationLayers: CircleMarker[] = this.createCircles();
    const arrivalMarker: Marker = this.leafletService.createArrivalMarker(
      this.journey.legs[this.journey.legs.length - 1].waypoints,
      ICON_WIDTH,
      ICON_HEIGHT,
      this.customerDirectory
    );
    const departureMarker: Marker = this.leafletService.createDepartureMarker(
      this.journey.legs[0].waypoints,
      ICON_WIDTH,
      ICON_HEIGHT,
      this.customerDirectory
    );
    return [
      arrivalMarker,
      departureMarker,
      ...waypointLayers,
      ...stationLayers
    ];
  }

  createJourneyWaypointLayer(): GeoJSON {
    let journeyGeoJson: number[][] = [];
    this.journey.legs.forEach(legs => {
      const geoJson: number[][] = this.leafletService.mapWaypointsToGeoJson(legs.waypoints);
      journeyGeoJson = [...journeyGeoJson, ...geoJson];
    });
    return geoJSON(
      {
        type: 'LineString',
        coordinates: journeyGeoJson
      } as never
    );
  }

  private createWaypointsLayer(): GeoJSON[] {
    return this.journey.legs.map((leg: LegFragment, index: number) => {
      if (index % 2) {
        return this.createWaypointLayer(leg, this.themeEmitterRef.primaryColor);
      }
      return this.createWaypointLayer(leg, this.themeEmitterRef.warnColor);
    });
  }

  private createCircles(): CircleMarker[] {
    const departureCircles: CircleMarker[] = this.createDepartureCircles();
    const intermediateStopCircles: CircleMarker[] = this.createIntermediateStopCircles();
    const arrivalCircles: CircleMarker[] = this.createArrivalCircles();

    return [...departureCircles, ...intermediateStopCircles, ...arrivalCircles];
  }

  private createIntermediateStopCircles(): CircleMarker[] {
    return this.journey.legs.reduce((intermediateStopCircles: CircleMarker[], leg: LegFragment, legIndex: number) => {
      if (legIndex % 2) {
        return intermediateStopCircles.concat(leg.intermediateStops.map((intermediateStop: TravelPointFragment) => this.createCircle(intermediateStop, this.themeEmitterRef.primaryColor)));
      }
      return intermediateStopCircles.concat(leg.intermediateStops.map((intermediateStop: TravelPointFragment) => this.createCircle(intermediateStop, this.themeEmitterRef.warnColor)));
    }, []);
  }

  private createDepartureCircles(): CircleMarker[] {
    return this.journey.legs.map((leg: LegFragment, index: number) => {
      if (index % 2) {
        return this.createCircle(leg.departure, this.themeEmitterRef.primaryColor);
      } else {
        return this.createCircle(leg.departure, this.themeEmitterRef.warnColor);
      }
    });
  }

  private createArrivalCircles(): CircleMarker[] {
    return this.journey.legs.map((leg: LegFragment, index: number) => {
      if (index % 2) {
        return this.createCircle(leg.arrival, this.themeEmitterRef.primaryColor);
      }
      return this.createCircle(leg.arrival, this.themeEmitterRef.warnColor);
    });
  }

  private createCircle(travelPoint: TravelPointFragment, color: string): CircleMarker {
    return circleMarker({
      lat: travelPoint.point.y,
      lng: travelPoint.point.x
    }, {
      radius: 5,
      fillOpacity: 1,
      fillColor: '#ffffff',
      fillRule: 'evenodd',
      color
    }).bindTooltip(`<span style='font-size: 16px'>${travelPoint.name}<span>`);
  }


  private createWaypointLayer(leg: LegFragment, color: string): GeoJSON {
    const geoJson: number[][] = this.leafletService.mapWaypointsToGeoJson(leg.waypoints);
    const waypoints: GeoJSON = geoJSON(
      {
        type: 'LineString',
        coordinates: geoJson
      } as never, {
        style: {
          weight: 8,
          color
        }
      }
    );
    if (this.journey.legs.length !== 1 && !leg.vehicleNumber) {
      return waypoints;
    }
    return waypoints.bindTooltip(`<span style='font-size: 16px'>${this.vehicleTypePipe.transform(leg.vehicleType)} ${leg.vehicleNumber}<span>`, {
      permanent: true,
      direction: 'bottom'
    });
  }
}
