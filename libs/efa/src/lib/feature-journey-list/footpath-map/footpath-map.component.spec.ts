import { FootpathMapComponent } from './footpath-map.component';
import {
  getFurtwangenFriedrichStreetGeoJson,
  getFurtwangenFriedrichStreetToIlbenStreetGeoJson,
  getFurtwangenFriedrichStreetToIlbenStreetWaypoints
} from '../../domain/objectmothers/footpath-object-mother';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared';
import { LeafletService } from '../../domain/util/leaflet.service';
import { GeoJSON, LatLngBounds, Layer, Marker } from 'leaflet';
import { getArrivalMarker, getDepartureMarker } from '../../domain/objectmothers/marker-object-mother';
import { MockService } from 'ng-mocks';
import { getFriedrichStreetWalkStep } from '../../domain/objectmothers/walk-step-object-mother';
import { PointFragment } from '../../domain/model/generated';

describe('FootpathMapComponent', () => {

  const leafletService: LeafletService = MockService(LeafletService, {
    createArrivalMarker: (): Marker => getArrivalMarker(),
    createDepartureMarker: (): Marker => getDepartureMarker(),
    mapWaypointsToGeoJson: (waypoints: PointFragment[]): number[][] => {
      const realLeafletService: LeafletService = new LeafletService();
      return realLeafletService.mapWaypointsToGeoJson(waypoints);
    }
  });

  const componentUnderTest: FootpathMapComponent = new FootpathMapComponent(leafletService);

  beforeEach(() => {
    const themeEmitterRef: ThemeEmitterComponent = new ThemeEmitterComponent();
    themeEmitterRef.primaryColor = '#0000FF';
    themeEmitterRef.warnColor = '#FF0000';
    componentUnderTest.themeEmitterRef = themeEmitterRef;
  });


  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should "buildLayers" correctly for waypoints when selectedWalkStep is not selected', () => {
    componentUnderTest.waypoints = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();
    componentUnderTest.handleShowWalkStepEvent(null);

    const result: Layer[] = componentUnderTest.buildLayers();

    expect(result.length).toBe(3);
    expect((result[0] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[0] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[0] as GeoJSON).options.style).toEqual({ color: '#0000FF' });
    expect(result[1]).toEqual(getArrivalMarker());
    expect(result[2]).toEqual(getDepartureMarker());
  });

  it('should "buildLayers" correctly for waypoints when selectedWalkStep is selected', () => {
    componentUnderTest.waypoints = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();
    componentUnderTest.handleShowWalkStepEvent(getFriedrichStreetWalkStep());

    const result: Layer[] = componentUnderTest.buildLayers();

    expect(result.length).toBe(4);
    expect((result[0] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[0] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[0] as GeoJSON).options.style).toEqual({ color: '#0000FF' });
    expect(result[1]).toEqual(getArrivalMarker());
    expect(result[2]).toEqual(getDepartureMarker());
    expect((result[3] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetGeoJson().getBounds());
    expect((result[3] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetGeoJson().feature);
    expect((result[3] as GeoJSON).options.style).toEqual({ color: '#FF0000' });
  });

  it('should calculate zoom correctly when selectedWalkStep is not selected', () => {
    const testGeoJson: GeoJSON = getFurtwangenFriedrichStreetToIlbenStreetGeoJson();
    componentUnderTest.handleShowWalkStepEvent(null);


    const result: LatLngBounds = componentUnderTest.getZoomBy(testGeoJson);

    expect(result).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
  });

  it('should calculate zoom correctly when selectedWalkStep is selected', () => {
    const testGeoJson: GeoJSON = getFurtwangenFriedrichStreetToIlbenStreetGeoJson();
    componentUnderTest.handleShowWalkStepEvent(getFriedrichStreetWalkStep());

    const result: LatLngBounds = componentUnderTest.getZoomBy(testGeoJson);

    expect(result).toEqual(getFurtwangenFriedrichStreetGeoJson().getBounds());
  });

});
