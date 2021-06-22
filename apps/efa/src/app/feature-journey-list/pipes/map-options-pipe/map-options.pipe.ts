import { Inject, Pipe, PipeTransform } from '@angular/core';
import {
  geoJSON,
  GeoJSON,
  icon,
  LatLngExpression,
  MapOptions,
  marker,
  Marker,
  polygon,
  tileLayer,
  TileLayer
} from 'leaflet';
import {
  CUSTOMER_DIRECTORY,
  MAP_ATTRIBUTION,
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE,
  OSM_MAP
} from '../../../../environments/config-tokens';
import { PointFragment } from '@dravelopsfrontend/generated-content';

const INDEX_ZERO = 0;
const INDEX_ONE = 1;
const ICON_WIDTH = 31.25;
const ICON_HEIGHT = 51.25;

@Pipe({
  name: 'mapOptions'
})
export class MapOptionsPipe implements PipeTransform {

  constructor(
    @Inject(CUSTOMER_DIRECTORY) private readonly customerDirectory: string
  ) {
  }

  transform(waypoints: PointFragment[], polygonColor: string): MapOptions {
    if (!waypoints) {
      return null;
    }
    const tileLayer: TileLayer = this.createTileLayer();
    const footpathLayer: GeoJSON = this.createFootpathLayer(waypoints, polygonColor);
    const arrivalMarker: Marker = this.createArrivalMarker(waypoints);
    const departureMarker: Marker = this.createDepartureMarker(waypoints);
    return {
      layers: [
        tileLayer,
        footpathLayer,
        arrivalMarker,
        departureMarker
      ],
      worldCopyJump: false,
      maxBounds: polygon(this.getOuterWorldRing()).getBounds(),
      center: footpathLayer.getBounds().getCenter()
    };
  }

  private createFootpathLayer(waypoints: PointFragment[], polygonColor: string): GeoJSON {
    const geoJson: number[][] = this.mapWaypointsToGeoJson(waypoints);
    return geoJSON(
      {
        type: 'LineString',
        coordinates: geoJson
      } as never, {
        style: () => ({ color: polygonColor })
      }
    );
  }

  private createTileLayer(): TileLayer {
    return tileLayer(OSM_MAP, {
      attribution: MAP_ATTRIBUTION
    });
  }

  private createDepartureMarker(waypoints: PointFragment[]): Marker {
    const geoJson: number[][] = this.mapWaypointsToGeoJson(waypoints);
    return marker([geoJson[INDEX_ZERO][INDEX_ONE], geoJson[INDEX_ZERO][INDEX_ZERO]], {
      icon: icon({
        iconSize: [ICON_WIDTH, ICON_HEIGHT],
        iconUrl: `assets/${this.customerDirectory}/departure_icon.svg`
      })
    });
  }

  private createArrivalMarker(waypoints: PointFragment[]): Marker {
    const geoJson: number[][] = this.mapWaypointsToGeoJson(waypoints);
    return marker([
        geoJson[geoJson.length - INDEX_ONE][INDEX_ONE],
        geoJson[geoJson.length - INDEX_ONE][INDEX_ZERO]
      ],
      {
        icon: icon({
          iconSize: [ICON_WIDTH, ICON_HEIGHT],
          iconUrl: `assets/${this.customerDirectory}/arrival_icon.svg`
        })
      });
  }

  private mapWaypointsToGeoJson(waypoints: PointFragment[]): number[][] {
    const geoJson: number[][] = new Array<Array<number>>();
    for (const [index, point] of waypoints.entries()) {
      geoJson[index] = [point.x, point.y];
    }
    return geoJson;
  }

  private getOuterWorldRing(): LatLngExpression[] {
    return [
      [MAX_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE],
      [MAX_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE]
    ];
  }

}
