import { ChangeDetectionStrategy, Component, Inject, Input, ViewChild } from '@angular/core';
import { PointFragment } from '@dravelopsfrontend/generated-content';
import { geoJSON, GeoJSON, Layer, Marker } from 'leaflet';
import { LeafletService } from '../../shared/util/leaflet.service';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';

const ICON_WIDTH = 31.25;
const ICON_HEIGHT = 51.25;

@Component({
  selector: 'dravelopsefafrontend-footpath-map',
  templateUrl: './footpath-map.component.html',
  styleUrls: ['./footpath-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FootpathMapComponent {
  @Input() waypoints: PointFragment[];
  @ViewChild('theme', { static: true }) themeEmitterRef: ThemeEmitterComponent;

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private readonly customerDirectory: string,
    private leafletService: LeafletService
  ) {
  }

  buildLayers(): Layer[] {
    const footpathLayer: GeoJSON = this.createFootpathLayer(this.waypoints);
    const arrivalMarker: Marker = this.leafletService.createArrivalMarker(
      this.waypoints,
      ICON_WIDTH,
      ICON_HEIGHT,
      this.customerDirectory
    );
    const departureMarker: Marker = this.leafletService.createDepartureMarker(
      this.waypoints,
      ICON_WIDTH,
      ICON_HEIGHT,
      this.customerDirectory
    );

    return [footpathLayer, arrivalMarker, departureMarker];
  }

  private createFootpathLayer(waypoints: PointFragment[]): GeoJSON {
    const geoJson: number[][] = this.leafletService.mapWaypointsToGeoJson(waypoints);
    return geoJSON(
      {
        type: 'LineString',
        coordinates: geoJson
      } as never, {
        style: {
          color: this.themeEmitterRef.primaryColor
        }
      }
    );
  }
}
