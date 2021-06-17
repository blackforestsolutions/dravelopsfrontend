import { MapOptionsPipe } from './map-options.pipe';
import { MapOptions, Polygon, TileLayer } from 'leaflet';
import {
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE, OSM_ZOOM_SNAP_LEVEL
} from '../../../../environments/config-tokens';
import {
  getHvvLeafletPolygon,
  getHvvLeafletPolygonWithInnerHole
} from '../../../shared/objectmothers/polygon-object-mother';

describe('MapOptionsPipe', () => {

  const classUnderTest: MapOptionsPipe = new MapOptionsPipe();

  it('create an instance', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return null when leafletPolygon is null', () => {
    const testLeafletPolygon: Polygon = null;
    const testPolygonColor = '#FFFFFF';

    const result: MapOptions = classUnderTest.transform(testLeafletPolygon, testPolygonColor);

    expect(result).toBeNull();
  });

  it('should create mapOptions correctly with leafletPolygon', () => {
    const testWaypoints: Polygon = getHvvLeafletPolygon();
    const testPolygonColor = '#FFFFFF';

    const result: MapOptions = classUnderTest.transform(testWaypoints, testPolygonColor);

    expect(result.layers[0]).toBeInstanceOf(TileLayer);
    expect(result.layers[1]).toEqual({
      ...getHvvLeafletPolygonWithInnerHole(),
      options: {
        color: testPolygonColor
      }
    });
    expect(result.zoomSnap).toBe(OSM_ZOOM_SNAP_LEVEL);
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
  });
});
