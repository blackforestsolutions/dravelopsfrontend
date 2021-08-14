import { Pipe, PipeTransform } from '@angular/core';
import { PointFragment } from '../../../domain/model/generated';
import { GeoJSON, geoJSON } from 'leaflet';

@Pipe({
  name: 'geoJson'
})
export class GeoJsonPipe implements PipeTransform {

  transform(waypoints: PointFragment[]): GeoJSON {
    if (!waypoints) {
      return null;
    }
    const geoJson: number[][] = new Array<Array<number>>();
    for (const [index, point] of waypoints.entries()) {
      geoJson[index] = [point.x, point.y];
    }
    return geoJSON(
      {
        type: 'LineString',
        coordinates: geoJson
      } as never
    );
  }
}
