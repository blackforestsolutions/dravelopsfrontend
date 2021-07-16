import { FootpathMapComponent } from './footpath-map.component';
import {
  getFurtwangenFriedrichStreetToIlbenStreetGeoJson,
  getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray,
  getFurtwangenFriedrichStreetToIlbenStreetWaypoints
} from '../../shared/objectmothers/footpath-object-mother';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';
import { LeafletService } from '../../shared/util/leaflet.service';
import { GeoJSON, Layer, Marker } from 'leaflet';
import { getArrivalMarker, getDepartureMarker } from '../../shared/objectmothers/marker-object-mother';
import { MockService } from 'ng-mocks';

describe('FootpathMapComponent', () => {

  const leafletService: LeafletService = MockService(LeafletService, {
    createArrivalMarker: (): Marker => getArrivalMarker(),
    createDepartureMarker: (): Marker => getDepartureMarker(),
    mapWaypointsToGeoJson: (): number[][] => getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray()
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

  it('should "buildLayers" correctly for waypoints', () => {
    componentUnderTest.waypoints = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();

    const result: Layer[] = componentUnderTest.buildLayers();

    expect((result[0] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[0] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[0] as GeoJSON).options.style).toEqual({ color: '#0000FF' });
    expect(result[1]).toEqual(getArrivalMarker());
    expect(result[2]).toEqual(getDepartureMarker());
  });

});
