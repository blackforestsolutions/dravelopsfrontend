import { MapOptionsPipe } from './map-options.pipe';
import { PointFragment } from '@dravelopsfrontend/generated-content';
import { GeoJSON, MapOptions, TileLayer } from 'leaflet';
import { getFurtwangenFriedrichStreetToIlbenStreetWaypoints } from '../../../shared/objectmothers/footpath-object-mother';
import {
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE
} from '../../../../environments/config-tokens';
import { getArrivalMarker, getDepartureMarker } from '../../../shared/objectmothers/marker-object-mother';

describe('MapOptionsPipe', () => {

  const customerDirectory = 'bw';

  const classUnderTest: MapOptionsPipe = new MapOptionsPipe(customerDirectory);

  it('create an instance', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return null when waypoints are null', () => {
    const testWaypoints: PointFragment[] = null;
    const testPolygonColor = '#FFFFFF';

    const result: MapOptions = classUnderTest.transform(testWaypoints, testPolygonColor);

    expect(result).toBeNull();
  });

  it('should return mapOptions when waypoints are null', () => {
    const testWaypoints: PointFragment[] = null;
    const testPolygonColor = '#FFFFFF';

    const result: MapOptions = classUnderTest.transform(testWaypoints, testPolygonColor);

    expect(result).toBeNull();
  });

  it('should create mapOptions correctly with waypoints', () => {
    const testWaypoints: PointFragment[] = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();
    const testPolygonColor = '#FFFFFF';

    const result: MapOptions = classUnderTest.transform(testWaypoints, testPolygonColor);

    expect(result.layers[0]).toBeInstanceOf(TileLayer);
    expect(result.layers[1]).toBeInstanceOf(GeoJSON);
    expect(result.layers[2]).toEqual(getArrivalMarker());
    expect(result.layers[3]).toEqual(getDepartureMarker());
    expect(result.worldCopyJump).toBeFalsy();
    expect(result.maxBounds).toEqual({
      _northEast: {
        lat: MAX_WGS_84_LATITUDE,
        lng: MAX_WGS_84_LONGITUDE
      },
      _southWest: {
        lat: MIN_WGS_84_LATITUDE,
        lng: MIN_WGS_84_LONGITUDE
      }
    });
    expect(result.center).toEqual({ lat: 48.057365000000004, lng: 8.203415 });
  });
});
