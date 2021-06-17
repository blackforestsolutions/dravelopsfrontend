import { GeoJsonPipe } from './geo-json.pipe';
import { PointFragment } from '@dravelopsfrontend/generated-content';
import { GeoJSON } from 'leaflet';
import { expect } from '@jest/globals';
import {
  getFurtwangenFriedrichStreetToIlbenStreetGeoJson,
  getFurtwangenFriedrichStreetToIlbenStreetWaypoints
} from '../../../shared/objectmothers/footpath-object-mother';

describe('GeoJsonPipe', () => {

  const classUnderTest: GeoJsonPipe = new GeoJsonPipe();

  it('create an instance', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return null when waypoints are null', () => {
    const testWaypoints: PointFragment[] = null;

    const result: GeoJSON = classUnderTest.transform(testWaypoints);

    expect(result).toBeNull();
  });

  it('should return leafletGeoJson with waypoints', () => {
    const testWaypoints: PointFragment[] = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();

    const result: GeoJSON = classUnderTest.transform(testWaypoints);

    expect(result.toGeoJSON()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().toGeoJSON());
  });
});
