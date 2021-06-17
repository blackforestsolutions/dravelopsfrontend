import { Pipe, PipeTransform } from '@angular/core';
import {
  control,
  Control,
  LatLng,
  LatLngExpression,
  MapOptions,
  polygon,
  Polygon,
  tileLayer,
  TileLayer
} from 'leaflet';
import {
  MAP_ATTRIBUTION,
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE,
  OSM_MAP,
  OSM_ZOOM_SNAP_LEVEL
} from '../../../../environments/config-tokens';

@Pipe({
  name: 'mapOptions'
})
export class MapOptionsPipe implements PipeTransform {

  transform(leafletPolygon: Polygon, polygonColor: string): MapOptions {
    if (!leafletPolygon) {
      return null;
    }
    const tileLayer: TileLayer = this.createTileLayer();
    const polygonLayer: Polygon = this.createPolygonLayerWithHole(leafletPolygon.getLatLngs() as LatLng[], polygonColor);
    return {
      layers: [
        tileLayer,
        polygonLayer
      ],
      worldCopyJump: false,
      zoomSnap: OSM_ZOOM_SNAP_LEVEL,
      maxBounds: polygon(this.getOuterWorldRing()).getBounds()
    };
  }

  private createTileLayer(): TileLayer {
    return tileLayer(OSM_MAP, {
      attribution: MAP_ATTRIBUTION
    });
  }

  private createPolygonLayerWithHole(hole: LatLng[], polygonColor): Polygon {
    const polygonWithInnerHole: LatLngExpression[][] = this.buildPolygonWithInnerHole(hole);

    return polygon(polygonWithInnerHole, {
      color: polygonColor
    });
  }

  private buildPolygonWithInnerHole(hole: LatLng[]): LatLngExpression[][] {
    return [
      this.getOuterWorldRing(),
      hole
    ];
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
