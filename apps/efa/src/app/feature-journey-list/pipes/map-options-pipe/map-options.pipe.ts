import { Pipe, PipeTransform } from '@angular/core';
import { MapOptions, polygon, TileLayer } from 'leaflet';
import { OSM_ZOOM_SNAP_LEVEL } from '../../../../environments/config-tokens';
import { LeafletService } from '../../../shared/util/leaflet.service';

@Pipe({
  name: 'mapOptions'
})
export class MapOptionsPipe implements PipeTransform {

  constructor(
    private readonly leafletService: LeafletService
  ) {
  }

  transform(value: unknown): MapOptions {
    if (!value) {
      return null;
    }
    const tileLayer: TileLayer = this.leafletService.createTileLayer();
    return {
      layers: [tileLayer],
      worldCopyJump: false,
      maxBounds: polygon(this.leafletService.getOuterWorldRing()).getBounds(),
      zoomSnap: OSM_ZOOM_SNAP_LEVEL
    };
  }

}
