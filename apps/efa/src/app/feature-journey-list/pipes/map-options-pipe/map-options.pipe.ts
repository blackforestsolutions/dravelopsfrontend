import { Pipe, PipeTransform } from '@angular/core';
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
const ICON_HEIGHT = 25;
const ICON_WIDTH = 41;

@Pipe({
  name: 'mapOptions'
})
export class MapOptionsPipe implements PipeTransform {

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
        iconSize: [ICON_HEIGHT, ICON_WIDTH],
        iconUrl: 'assets/footpath/departure_icon.svg'
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
          iconSize: [ICON_HEIGHT, ICON_WIDTH],
          iconUrl: 'assets/footpath/arrival_icon.svg'
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
