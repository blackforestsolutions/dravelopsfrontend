import { JourneyMapComponent } from './journey-map.component';
import { VehicleTypePipe } from '../pipes/vehicle-type-pipe/vehicle-type.pipe';
import { LeafletService } from '../../domain/util/leaflet.service';
import { MockService } from 'ng-mocks';
import { getArrivalMarker, getDepartureMarker } from '../../domain/objectmothers/marker-object-mother';
import { CircleMarker, GeoJSON, Layer, Marker } from 'leaflet';
import {
  getFurtwangenFriedrichStreetToIlbenStreetGeoJson,
  getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray,
  getJourneyWaypointsGeoJson
} from '../../domain/objectmothers/footpath-object-mother';
import { getFurtwangenToWaldkirchJourney } from '../../domain/objectmothers/journey-object-mother';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared';
import { expect } from '@jest/globals';
import {
  getBleibachSevTravelPoint,
  getFurtwangenIlbenstreetTravelPoint,
  getGrosshausbergTravelPoint,
  getGuetenbachTownHallTravelPoint,
  getKollnauTrainStationTravelPoint,
  getSickAgTravelPoint,
  getSimonswaldTownHallTravelPoint,
  getWaldkirchKastelberghalleTravelPoint,
  getWaldkirchTownCenterTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';

describe('JourneyMapComponent', () => {
  const leafletService: LeafletService = MockService(LeafletService, {
    createArrivalMarker: (): Marker => getArrivalMarker(),
    createDepartureMarker: (): Marker => getDepartureMarker(),
    mapWaypointsToGeoJson: (): number[][] => getFurtwangenFriedrichStreetToIlbenStreetGeoJsonArray()
  });
  const vehicleTypePipe: VehicleTypePipe = MockService(VehicleTypePipe, {
    transform(value: string): string {
      return value;
    }
  });
  const componentUnderTest: JourneyMapComponent = new JourneyMapComponent(leafletService, vehicleTypePipe);

  beforeEach(() => {
    const themeEmitterRef: ThemeEmitterComponent = new ThemeEmitterComponent();
    themeEmitterRef.primaryColor = '#0000FF';
    themeEmitterRef.warnColor = '#FF0000';
    componentUnderTest.themeEmitterRef = themeEmitterRef;
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should "buildDynamicLayers" correctly for departure and arrival marker', () => {
    componentUnderTest.journey = getFurtwangenToWaldkirchJourney();

    const result: Layer[] = componentUnderTest.buildDynamicLayers();

    expect(result.length).toBe(18);
    expect(result[0]).toEqual(getArrivalMarker());
    expect(result[1]).toEqual(getDepartureMarker());
  });

  it('should "buildDynamicLayers" correctly for waypointLayers', () => {
    componentUnderTest.journey = getFurtwangenToWaldkirchJourney();

    const result: Layer[] = componentUnderTest.buildDynamicLayers();

    expect((result[2] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[2] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[2] as GeoJSON).options.style).toEqual({ weight: 8, color: '#FF0000' });
    expect((result[2] as GeoJSON).getTooltip()).toBeUndefined();
    expect((result[3] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[3] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[3] as GeoJSON).getTooltip().getContent()).toContain('BUS 272');
    expect((result[3] as GeoJSON).options.style).toEqual({ weight: 8, color: '#0000FF' });
    expect((result[4] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[4] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[4] as GeoJSON).getTooltip().getContent()).toContain('BUS 201');
    expect((result[4] as GeoJSON).options.style).toEqual({ weight: 8, color: '#FF0000' });
    expect((result[5] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[5] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect((result[5] as GeoJSON).options.style).toEqual({ weight: 8, color: '#0000FF' });
  });

  it('should "buildDynamicLayers" correctly for departure stationLayers', () => {
    componentUnderTest.journey = getFurtwangenToWaldkirchJourney();

    const result: Layer[] = componentUnderTest.buildDynamicLayers();

    expect((result[6] as CircleMarker).options.color).toBe('#FF0000');
    expect((result[6] as CircleMarker).getLatLng().lat).toEqual(getGrosshausbergTravelPoint().point.y);
    expect((result[6] as CircleMarker).getLatLng().lng).toEqual(getGrosshausbergTravelPoint().point.x);
    expect((result[6] as CircleMarker).getTooltip().getContent()).toContain(getGrosshausbergTravelPoint().name);
    expect((result[7] as CircleMarker).options.color).toBe('#0000FF');
    expect((result[7] as CircleMarker).getLatLng().lat).toEqual(getFurtwangenIlbenstreetTravelPoint().point.y);
    expect((result[7] as CircleMarker).getLatLng().lng).toEqual(getFurtwangenIlbenstreetTravelPoint().point.x);
    expect((result[7] as CircleMarker).getTooltip().getContent()).toContain(getFurtwangenIlbenstreetTravelPoint().name);
    expect((result[8] as CircleMarker).options.color).toBe('#FF0000');
    expect((result[8] as CircleMarker).getLatLng().lat).toEqual(getBleibachSevTravelPoint().point.y);
    expect((result[8] as CircleMarker).getLatLng().lng).toEqual(getBleibachSevTravelPoint().point.x);
    expect((result[8] as CircleMarker).getTooltip().getContent()).toContain(getBleibachSevTravelPoint().name);
    expect((result[9] as CircleMarker).options.color).toBe('#0000FF');
    expect((result[9] as CircleMarker).getLatLng().lat).toEqual(getWaldkirchKastelberghalleTravelPoint().point.y);
    expect((result[9] as CircleMarker).getLatLng().lng).toEqual(getWaldkirchKastelberghalleTravelPoint().point.x);
    expect((result[9] as CircleMarker).getTooltip().getContent()).toContain(getWaldkirchKastelberghalleTravelPoint().name);
  });

  it('should "buildDynamicLayers" correctly for intermediateStops stationLayers', () => {
    componentUnderTest.journey = getFurtwangenToWaldkirchJourney();

    const result: Layer[] = componentUnderTest.buildDynamicLayers();

    expect((result[10] as CircleMarker).options.color).toBe('#0000FF');
    expect((result[10] as CircleMarker).getLatLng().lat).toEqual(getGuetenbachTownHallTravelPoint().point.y);
    expect((result[10] as CircleMarker).getLatLng().lng).toEqual(getGuetenbachTownHallTravelPoint().point.x);
    expect((result[10] as CircleMarker).getTooltip().getContent()).toContain(getGuetenbachTownHallTravelPoint().name);
    expect((result[11] as CircleMarker).options.color).toBe('#0000FF');
    expect((result[11] as CircleMarker).getLatLng().lat).toEqual(getSimonswaldTownHallTravelPoint().point.y);
    expect((result[11] as CircleMarker).getLatLng().lng).toEqual(getSimonswaldTownHallTravelPoint().point.x);
    expect((result[11] as CircleMarker).getTooltip().getContent()).toContain(getSimonswaldTownHallTravelPoint().name);
    expect((result[12] as CircleMarker).options.color).toBe('#FF0000');
    expect((result[12] as CircleMarker).getLatLng().lat).toEqual(getKollnauTrainStationTravelPoint().point.y);
    expect((result[12] as CircleMarker).getLatLng().lng).toEqual(getKollnauTrainStationTravelPoint().point.x);
    expect((result[12] as CircleMarker).getTooltip().getContent()).toContain(getKollnauTrainStationTravelPoint().name);
    expect((result[13] as CircleMarker).options.color).toBe('#FF0000');
    expect((result[13] as CircleMarker).getLatLng().lat).toEqual(getWaldkirchTownCenterTravelPoint().point.y);
    expect((result[13] as CircleMarker).getLatLng().lng).toEqual(getWaldkirchTownCenterTravelPoint().point.x);
    expect((result[13] as CircleMarker).getTooltip().getContent()).toContain(getWaldkirchTownCenterTravelPoint().name);
  });

  it('should "buildDynamicLayers" correctly for arrival stationLayers', () => {
    componentUnderTest.journey = getFurtwangenToWaldkirchJourney();

    const result: Layer[] = componentUnderTest.buildDynamicLayers();

    expect((result[14] as CircleMarker).options.color).toBe('#FF0000');
    expect((result[14] as CircleMarker).getLatLng().lat).toEqual(getFurtwangenIlbenstreetTravelPoint().point.y);
    expect((result[14] as CircleMarker).getLatLng().lng).toEqual(getFurtwangenIlbenstreetTravelPoint().point.x);
    expect((result[14] as CircleMarker).getTooltip().getContent()).toContain(getFurtwangenIlbenstreetTravelPoint().name);
    expect((result[15] as CircleMarker).options.color).toBe('#0000FF');
    expect((result[15] as CircleMarker).getLatLng().lat).toEqual(getBleibachSevTravelPoint().point.y);
    expect((result[15] as CircleMarker).getLatLng().lng).toEqual(getBleibachSevTravelPoint().point.x);
    expect((result[15] as CircleMarker).getTooltip().getContent()).toContain(getBleibachSevTravelPoint().name);
    expect((result[16] as CircleMarker).options.color).toBe('#FF0000');
    expect((result[16] as CircleMarker).getLatLng().lat).toEqual(getWaldkirchKastelberghalleTravelPoint().point.y);
    expect((result[16] as CircleMarker).getLatLng().lng).toEqual(getWaldkirchKastelberghalleTravelPoint().point.x);
    expect((result[16] as CircleMarker).getTooltip().getContent()).toContain(getWaldkirchKastelberghalleTravelPoint().name);
    expect((result[17] as CircleMarker).options.color).toBe('#0000FF');
    expect((result[17] as CircleMarker).getLatLng().lat).toEqual(getSickAgTravelPoint().point.y);
    expect((result[17] as CircleMarker).getLatLng().lng).toEqual(getSickAgTravelPoint().point.x);
    expect((result[17] as CircleMarker).getTooltip().getContent()).toContain(getSickAgTravelPoint().name);
  });

  it('should "createJourneyWaypointLayer" correctly', () => {
    componentUnderTest.journey = getFurtwangenToWaldkirchJourney();

    const result: GeoJSON = componentUnderTest.createJourneyWaypointLayer();

    expect(result.getBounds()).toEqual(getJourneyWaypointsGeoJson().getBounds());
    expect(result.feature).toEqual(getJourneyWaypointsGeoJson().feature);
    expect(result.getTooltip()).toBeUndefined();
  });
});
