import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootpathMapComponent } from './footpath-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { getFurtwangenIlbenstreetToBleibachLeg } from '../../shared/objectmothers/leg-object-mother';
import {
  getArrivalMarker,
  getCenterLengthIsModuloOne,
  getCenterLengthIsModuloZero,
  getDepartureMarker,
  getMappedWaypointsToGeoJSONFormatLengthModuloOne,
  getMappedWaypointsToGeoJSONFormatLengthModuloZero
} from '../../shared/objectmothers/footpath-object-mother';
import { LatLng, Marker } from 'leaflet';

describe('FootpathMapComponent', () => {
  let componentUnderTest: FootpathMapComponent;
  let fixture: ComponentFixture<FootpathMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FootpathMapComponent],
      imports: [LeafletModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootpathMapComponent);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.waypoints = [...getFurtwangenIlbenstreetToBleibachLeg().waypoints];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should map waypoints to geoJSON format', () => {

    const geojsonCoordinates: Array<Array<number>> = componentUnderTest.mapWaypointsToGeoJSONCoordinates();

    expect(geojsonCoordinates).toEqual(getMappedWaypointsToGeoJSONFormatLengthModuloOne());
  });

  it('should calculate the center of the footpath with modulo one waypoints', () => {
    const geojsonCoordinates: Array<Array<number>> = getMappedWaypointsToGeoJSONFormatLengthModuloOne();

    const centerOfGeojsonCoordinates: LatLng = componentUnderTest.setCenter(geojsonCoordinates);

    expect(centerOfGeojsonCoordinates).toStrictEqual(getCenterLengthIsModuloOne());
  });

  it('should calculate the center of the footpath with modulo zero waypoints', () => {
    const geojsonCoordinates: Array<Array<number>> = getMappedWaypointsToGeoJSONFormatLengthModuloZero();

    const centerOfGeojsonCoordinates: LatLng = componentUnderTest.setCenter(geojsonCoordinates);

    expect(centerOfGeojsonCoordinates).toStrictEqual(getCenterLengthIsModuloZero());
  });

  it('should create departure marker', () => {
    const geojsonCoordinates: Array<Array<number>> = getMappedWaypointsToGeoJSONFormatLengthModuloOne();

    const departureMarker: Marker = componentUnderTest.createDepartureMarker(geojsonCoordinates);

    expect(departureMarker).toEqual(getDepartureMarker());
  });

  it('should create arrival marker', () => {
    const geojsonCoordinates: Array<Array<number>> = getMappedWaypointsToGeoJSONFormatLengthModuloOne();

    const arrivalMarker: Marker = componentUnderTest.createArrivalMarker(geojsonCoordinates);

    expect(arrivalMarker).toEqual(getArrivalMarker());
  });

});
