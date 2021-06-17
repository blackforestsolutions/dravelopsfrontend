import { Pipe, PipeTransform } from '@angular/core';
import { PointFragment, PolygonFragment } from '@dravelopsfrontend/generated-content';
import { latLng, LatLng, LatLngExpression, polygon, Polygon } from 'leaflet';

@Pipe({
  name: 'polygon'
})
export class PolygonPipe implements PipeTransform {

  transform(polygon: PolygonFragment): Polygon {
    if (!polygon) {
      return null;
    }
    return this.convertToLeafletPolygon(polygon);
  }

  private convertToLeafletPolygon(form: PolygonFragment): Polygon {
    const hole: LatLngExpression[] = form.points.map(point => this.convertPointToLatLng(point));

    return polygon(hole);
  }

  private convertPointToLatLng(point: PointFragment): LatLng {
    return latLng(
      point.y,
      point.x
    );
  }

}
