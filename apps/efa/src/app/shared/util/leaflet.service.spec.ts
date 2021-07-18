import { TestBed } from '@angular/core/testing';

import { LeafletService } from './leaflet.service';
import { PointFragment } from '@dravelopsfrontend/generated-content';
import {
  getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray,
  getFurtwangenFriedrichStreetToIlbenStreetWaypoints
} from '../objectmothers/footpath-object-mother';
import { LatLngExpression, Marker, TileLayer } from 'leaflet';
import { getArrivalMarker, getDepartureMarker } from '../objectmothers/marker-object-mother';
import {
  MAP_ATTRIBUTION,
  MAX_WGS_84_LATITUDE,
  MAX_WGS_84_LONGITUDE,
  MIN_WGS_84_LATITUDE,
  MIN_WGS_84_LONGITUDE
} from '../../../environments/config-tokens';

describe('LeafletService', () => {
  let classUnderTest: LeafletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    classUnderTest = TestBed.inject(LeafletService);
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should create departureMarker correctly with "waypoints", "iconWidth" and "iconHeight"', () => {
    const testWaypoints: PointFragment[] = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();
    const testWidth = 31.25;
    const testHeight = 51.25;
    const testDirectory = 'bw';

    const result: Marker = classUnderTest.createDepartureMarker(testWaypoints, testWidth, testHeight, testDirectory);

    expect(result).toEqual(getDepartureMarker());
  });

  it('should create arrivalMarker correctly with "waypoints", "iconWidth" and "iconHeight"', () => {
    const testWaypoints: PointFragment[] = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();
    const testWidth = 31.25;
    const testHeight = 51.25;
    const testDirectory = 'bw';

    const result: Marker = classUnderTest.createArrivalMarker(testWaypoints, testWidth, testHeight, testDirectory);

    expect(result).toEqual(getArrivalMarker());
  });

  it('should "mapWaypointsToGeoJson" correctly with "waypoints"', () => {
    const testWaypoints: PointFragment[] = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();

    const result: number[][] = classUnderTest.mapWaypointsToGeoJson(testWaypoints);

    expect(result).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray());
  });

  it('should create base tileLayer correctly', () => {

    const result: TileLayer = classUnderTest.createTileLayer();

    expect(result.getAttribution()).toBe(MAP_ATTRIBUTION);
  });

  it('should create outer world ring correctly', () => {

    const result: LatLngExpression[] = classUnderTest.getOuterWorldRing();

    expect(result.length).toBe(4);
    // left top latitude
    expect(result[0][0]).toEqual(MAX_WGS_84_LATITUDE);
    // left top longitude
    expect(result[0][1]).toEqual(MIN_WGS_84_LONGITUDE);
    // right top latitude
    expect(result[1][0]).toEqual(MAX_WGS_84_LATITUDE);
    // right top longitude
    expect(result[1][1]).toEqual(MAX_WGS_84_LONGITUDE);
    // right bottom latitude
    expect(result[2][0]).toEqual(MIN_WGS_84_LATITUDE);
    // right bottom longitude
    expect(result[2][1]).toEqual(MAX_WGS_84_LONGITUDE);
    // left bottom latitude
    expect(result[3][0]).toEqual(MIN_WGS_84_LATITUDE);
    // left bottom longitude
    expect(result[3][1]).toEqual(MIN_WGS_84_LONGITUDE);
  });
});
