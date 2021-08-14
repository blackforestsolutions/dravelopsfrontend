import { PolygonPipe } from './polygon.pipe';
import { PolygonFragment } from '../../../domain/model/generated';
import { getHvvLeafletPolygon, getHvvOperatingArea } from '../../../domain/objectmothers/polygon-object-mother';
import { Polygon } from 'leaflet';

describe('PolygonPipe', () => {

  const classUnderTest: PolygonPipe = new PolygonPipe();

  it('create an instance', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return null when polygon is null', () => {
    const testPolygon: PolygonFragment = null;

    const result: Polygon = classUnderTest.transform(testPolygon);

    expect(result).toBeNull();
  });

  it('should map polygon to leafletPolygon', () => {
    const testPolygon: PolygonFragment = getHvvOperatingArea();

    const result: Polygon = classUnderTest.transform(testPolygon);

    expect(result).toEqual(getHvvLeafletPolygon());
  });
});
