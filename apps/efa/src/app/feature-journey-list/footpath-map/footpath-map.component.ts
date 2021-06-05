import { Component, Input, OnChanges } from '@angular/core';
import { GeoJSON, geoJSON, icon, LatLng, latLng, LeafletEvent, Map, MapOptions, Marker, marker, TileLayer, tileLayer } from 'leaflet';
import { PointFragment } from '../../shared/model/generated';

const OSM_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEPARTURE_ICON_URL = 'assets/footpath/departure_icon.svg';
const ARRIVAL_ICON_URL = 'assets/footpath/arrival_icon.svg';
const INDEX_ZERO = 0;
const INDEX_ONE = 1;
const ICON_HEIGHT = 25;
const ICON_WIDTH = 41;
const GEOJSON_FEATURE = 'LineString';
const MAP_ZOOM_LEVEL = 15;
const DIVIDER = 2;
const FOOTPATH_LAYER_COLOR = '#ff7800';
const MAP_OPACITY = 0.7;
const MAP_ZOOM = 15;
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

@Component({
  selector: 'dravelopsefafrontend-footpath-map',
  templateUrl: './footpath-map.component.html',
  styleUrls: ['./footpath-map.component.scss']
})
export class FootpathMapComponent implements OnChanges {

  @Input() waypoints: PointFragment[];
  options: MapOptions;
  private map: Map;
  private zoom: number;
  private geoJSONCoordinates: Array<Array<number>>;


  ngOnChanges(): void {
    this.options = this.getMap();
  }

  onMapReady(map: Map): void {
    this.map = map;
    this.zoom = map.getZoom();
  }

  onMapZoomEnd(e: LeafletEvent): void {
    this.zoom = e.target.getZoom();
  }

  mapWaypointsToGeoJSONCoordinates(): Array<Array<number>> {
    const geojsonCoordinates: Array<Array<number>> = new Array<Array<number>>();
    for (const [indexOfPoint, point] of this.waypoints.entries()) {
      const lonLat: Array<number> = new Array<number>();
      lonLat[0] = point.x;
      lonLat[1] = point.y;
      geojsonCoordinates[indexOfPoint] = lonLat;
    }
    return geojsonCoordinates;
  }


  private getMap(): unknown {
    this.geoJSONCoordinates = this.mapWaypointsToGeoJSONCoordinates();
    return {
      layers: [
        this.createTileLayer(),
        this.createFootpathLayer(this.geoJSONCoordinates),
        this.createArrivalMarker(this.geoJSONCoordinates),
        this.createDepartureMarker(this.geoJSONCoordinates)
      ],
      zoom: MAP_ZOOM_LEVEL,
      center: this.setCenter(this.geoJSONCoordinates)
    };
  }

  setCenter(geoJSONCoordinates: Array<Array<number>>): LatLng {
    return latLng(
      geoJSONCoordinates[Math.floor(geoJSONCoordinates.length / DIVIDER)][INDEX_ONE],
      geoJSONCoordinates[Math.floor(geoJSONCoordinates.length / DIVIDER)][INDEX_ZERO]
    );
  }

  createDepartureMarker(geoJSONCoordinates: Array<Array<number>>): Marker {
    return marker([geoJSONCoordinates[INDEX_ZERO][INDEX_ONE], geoJSONCoordinates[INDEX_ZERO][INDEX_ZERO]], {
      icon: icon({
        iconSize: [ICON_HEIGHT, ICON_WIDTH],
        iconUrl: DEPARTURE_ICON_URL
      })
    });
  }

  createArrivalMarker(geoJSONCoordinates: Array<Array<number>>): Marker {
    return marker(
      [geoJSONCoordinates[geoJSONCoordinates.length - INDEX_ONE][INDEX_ONE],
        geoJSONCoordinates[geoJSONCoordinates.length - INDEX_ONE][INDEX_ZERO]],
      {
        icon: icon({
          iconSize: [ICON_HEIGHT, ICON_WIDTH],
          iconUrl: ARRIVAL_ICON_URL
        })
      });
  }

  createFootpathLayer(geoJSONCoordinates: Array<Array<number>>): GeoJSON {
    return geoJSON(
      {
        type: GEOJSON_FEATURE,
        coordinates:
        geoJSONCoordinates
      } as never,
      { style: () => ({ color: FOOTPATH_LAYER_COLOR }) });
  }

  private createTileLayer(): TileLayer {
    return tileLayer(OSM_MAP, {
      opacity: MAP_OPACITY,
      maxZoom: MAP_ZOOM,
      detectRetina: true,
      attribution: MAP_ATTRIBUTION
    });
  }
}

