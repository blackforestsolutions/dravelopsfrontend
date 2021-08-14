import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { PointFragment, WalkStep, WalkStepFragment } from '../../domain/model/generated';
import { geoJSON, GeoJSON, LatLngBounds, Layer, Marker } from 'leaflet';
import { LeafletService } from '../../domain/util/leaflet.service';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared';

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
  @Input() walkSteps: WalkStepFragment[];
  @ViewChild('theme', { static: true }) themeEmitterRef: ThemeEmitterComponent;

  private selectedWalkStep: WalkStepFragment;

  constructor(
    private leafletService: LeafletService
  ) {
  }

  buildLayers(): Layer[] {
    const footpathLayer: GeoJSON = this.createFootpathLayer(this.waypoints, this.themeEmitterRef.primaryColor);
    const arrivalMarker: Marker = this.leafletService.createArrivalMarker(
      this.waypoints,
      ICON_WIDTH,
      ICON_HEIGHT
    );
    const departureMarker: Marker = this.leafletService.createDepartureMarker(
      this.waypoints,
      ICON_WIDTH,
      ICON_HEIGHT
    );

    if (this.selectedWalkStep) {
      const walkStepLayer: GeoJSON = this.createWalkStepLayer();
      return [footpathLayer, arrivalMarker, departureMarker, walkStepLayer];
    }
    return [footpathLayer, arrivalMarker, departureMarker];
  }

  getZoomBy(waypointGeoJson: GeoJSON): LatLngBounds {
    if (this.selectedWalkStep) {
      return this.createWalkStepLayer().getBounds();
    }
    return waypointGeoJson.getBounds();
  }

  handleShowWalkStepEvent(selectedWalkStep: WalkStep): void {
    this.selectedWalkStep = selectedWalkStep;
  }

  private createWalkStepLayer(): GeoJSON {
    const closestStartPointWaypointIndex: number = this.getClosestWaypointIndexTo(this.selectedWalkStep.startPoint);
    const closestEndPointWaypointIndex: number = this.getClosestWaypointIndexTo(this.selectedWalkStep.endPoint);
    const waypoints: PointFragment[] = this.waypoints.slice(closestStartPointWaypointIndex, closestEndPointWaypointIndex + 1);

    return this.createFootpathLayer([this.selectedWalkStep.startPoint, ...waypoints, this.selectedWalkStep.endPoint], this.themeEmitterRef.warnColor);
  }

  private getClosestWaypointIndexTo(point: PointFragment): number {
    let closestWaypointIndex = 0;
    let closestDistance = this.getDistanceBetween(this.waypoints[0], point);
    for (let waypointIndex = 1; waypointIndex < this.waypoints.length; waypointIndex++) {
      const distance: number = this.getDistanceBetween(this.waypoints[waypointIndex], point);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestWaypointIndex = waypointIndex;
      }
    }
    return closestWaypointIndex;
  }

  /**
   * This routine calculates the distance between two points in miles
   * Source: https://www.geodatasource.com/developers/javascript
   * @param firstPoint
   * @param secondPoint
   */
  private getDistanceBetween(firstPoint: PointFragment, secondPoint: PointFragment): number {
    if (firstPoint.y == secondPoint.y && firstPoint.x == secondPoint.x) {
      return 0;
    }
    const radFirstPointLatitude: number = Math.PI * firstPoint.y / 180;
    const radSecondPointLatitude: number = Math.PI * secondPoint.y / 180;
    const theta = firstPoint.x - secondPoint.x;
    const radTheta = Math.PI * theta / 180;

    let dist = Math.sin(radFirstPointLatitude) * Math.sin(radSecondPointLatitude) + Math.cos(radFirstPointLatitude) * Math.cos(radSecondPointLatitude) * Math.cos(radTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    return dist;
  }

  private createFootpathLayer(waypoints: PointFragment[], color: string): GeoJSON {
    const geoJson: number[][] = this.leafletService.mapWaypointsToGeoJson(waypoints);
    return geoJSON(
      {
        type: 'LineString',
        coordinates: geoJson
      } as never, {
        style: {
          color
        }
      }
    );
  }
}
