import { Pipe, PipeTransform } from '@angular/core';
import { LatLng, LatLngExpression, MapOptions, polygon, Polygon, TileLayer } from 'leaflet';
import { LeafletService } from '../../../shared/util/leaflet.service';

@Pipe({
  name: 'mapOptions'
})
export class MapOptionsPipe implements PipeTransform {

  constructor(
    private readonly leafletService: LeafletService
  ) {
  }

  transform(leafletPolygon: Polygon, polygonColor: string): MapOptions {
    if (!leafletPolygon) {
      return null;
    }
    const tileLayer: TileLayer = this.leafletService.createTileLayer();
    const polygonLayer: Polygon = this.createPolygonLayerWithHole(leafletPolygon.getLatLngs() as LatLng[], polygonColor);
    return {
      layers: [
        tileLayer,
        polygonLayer
      ],
      worldCopyJump: false,
      zoomSnap: 0.1,
      maxBounds: polygon(this.leafletService.getOuterWorldRing()).getBounds()
    };
  }

  private createPolygonLayerWithHole(hole: LatLng[], polygonColor): Polygon {
    const polygonWithInnerHole: LatLngExpression[][] = this.buildPolygonWithInnerHole(hole);

    return polygon(polygonWithInnerHole, {
      color: polygonColor
    });
  }

  private buildPolygonWithInnerHole(hole: LatLng[]): LatLngExpression[][] {
    return [
      this.leafletService.getOuterWorldRing(),
      hole
    ];
  }

}
