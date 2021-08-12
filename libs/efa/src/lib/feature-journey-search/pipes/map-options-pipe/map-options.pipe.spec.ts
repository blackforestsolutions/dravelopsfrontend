import { MapOptionsPipe } from './map-options.pipe';
import { LatLngExpression, MapOptions, Polygon, tileLayer, TileLayer } from 'leaflet';
import {
  MAP_ATTRIBUTION,
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE,
  OSM_MAP
} from '@dravelopsfrontend/shared';
import {
  getHvvLeafletPolygon,
  getHvvLeafletPolygonWithInnerHole
} from '../../../domain/objectmothers/polygon-object-mother';
import { LeafletService } from '../../../domain/util/leaflet.service';
import { MockService } from 'ng-mocks';

describe('MapOptionsPipe', () => {

  const leafletService: LeafletService = MockService(LeafletService, {
    getOuterWorldRing: (): LatLngExpression[] => [
      [MAX_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE],
      [MAX_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MAX_WGS_84_LONGITUDE],
      [MIN_WGS_84_LATITUDE, MIN_WGS_84_LONGITUDE]
    ],
    createTileLayer: (): TileLayer => tileLayer(OSM_MAP, {
      attribution: MAP_ATTRIBUTION
    })
  });

  const classUnderTest: MapOptionsPipe = new MapOptionsPipe(leafletService);

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
    expect(result.zoomSnap).toBe(0.1);
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
