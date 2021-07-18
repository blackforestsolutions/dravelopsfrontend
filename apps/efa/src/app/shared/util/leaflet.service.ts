import { Injectable } from '@angular/core';
import { icon, LatLngExpression, marker, Marker, tileLayer, TileLayer } from 'leaflet';
import {
  MAP_ATTRIBUTION,
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE,
  OSM_MAP
} from '../../../environments/config-tokens';
import { PointFragment } from '@dravelopsfrontend/generated-content';

const INDEX_ZERO = 0;
const INDEX_ONE = 1;

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  createDepartureMarker(waypoints: PointFragment[], iconWidth: number, iconHeight: number, customerDirectory: string): Marker {
    const geoJson: number[][] = this.mapWaypointsToGeoJson(waypoints);
    return marker([geoJson[INDEX_ZERO][INDEX_ONE], geoJson[INDEX_ZERO][INDEX_ZERO]], {
      icon: icon({
        iconSize: [iconWidth, iconHeight],
        iconUrl: `assets/${customerDirectory}/departure_icon.svg`
      })
    });
  }

  createArrivalMarker(waypoints: PointFragment[], iconWidth: number, iconHeight: number, customerDirectory: string): Marker {
    const geoJson: number[][] = this.mapWaypointsToGeoJson(waypoints);
    return marker([
        geoJson[geoJson.length - INDEX_ONE][INDEX_ONE],
        geoJson[geoJson.length - INDEX_ONE][INDEX_ZERO]
      ],
      {
        icon: icon({
          iconSize: [iconWidth, iconHeight],
          iconUrl: `assets/${customerDirectory}/arrival_icon.svg`
        })
      });
  }

  mapWaypointsToGeoJson(waypoints: PointFragment[]): number[][] {
    const geoJson: number[][] = new Array<Array<number>>();
    for (const [index, point] of waypoints.entries()) {
      geoJson[index] = [point.x, point.y];
    }
    return geoJson;
  }

  createTileLayer(): TileLayer {
    return tileLayer(OSM_MAP, {
      attribution: MAP_ATTRIBUTION
    });
  }

  getOuterWorldRing(): LatLngExpression[] {
    return [
      [MAX_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE],
      [MAX_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE]
    ];
  }

}
