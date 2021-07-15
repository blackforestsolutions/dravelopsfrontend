import { MapOptionsPipe } from './map-options.pipe';
import { PointFragment } from '@dravelopsfrontend/generated-content';
import { LatLngExpression, MapOptions, tileLayer, TileLayer } from 'leaflet';
import { getFurtwangenFriedrichStreetToIlbenStreetWaypoints } from '../../../shared/objectmothers/footpath-object-mother';
import {
  MAP_ATTRIBUTION,
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE,
  OSM_MAP,
  OSM_ZOOM_SNAP_LEVEL
} from '../../../../environments/config-tokens';
import { LeafletService } from '../../../shared/util/leaflet.service';
import { MockService } from 'ng-mocks';
import { expect } from '@jest/globals';

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

  it('should return null when value is null', () => {
    const testValue: PointFragment[] = null;

    const result: MapOptions = classUnderTest.transform(testValue);

    expect(result).toBeNull();
  });

  it('should create mapOptions correctly with waypoints', () => {
    const testWaypoints: PointFragment[] = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();

    const result: MapOptions = classUnderTest.transform(testWaypoints);

    expect(result.layers[0]).toBeInstanceOf(TileLayer);
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
    expect(result.zoomSnap).toBe(OSM_ZOOM_SNAP_LEVEL);
  });
});
