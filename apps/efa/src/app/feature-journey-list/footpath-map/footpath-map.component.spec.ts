import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootpathMapComponent } from './footpath-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GeoJsonPipe } from '../pipes/geo-json-pipe/geo-json.pipe';
import {
  getFurtwangenFriedrichStreetToIlbenStreetGeoJson,
  getFurtwangenFriedrichStreetToIlbenStreetWaypoints
} from '../../shared/objectmothers/footpath-object-mother';
import { MapOptionsPipe } from '../pipes/map-options-pipe/map-options.pipe';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';
import { LeafletService } from '../../shared/util/leaflet.service';
import { GeoJSON, Layer } from 'leaflet';
import { getArrivalMarker, getDepartureMarker } from '../../shared/objectmothers/marker-object-mother';
import { ChangeDetectionStrategy } from '@angular/core';

describe('FootpathMapComponent', () => {
  let componentUnderTest: FootpathMapComponent;
  let fixture: ComponentFixture<FootpathMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FootpathMapComponent,
        ThemeEmitterComponent,
        GeoJsonPipe,
        MapOptionsPipe
      ],
      providers: [
        {
          provide: CUSTOMER_DIRECTORY,
          useValue: 'bw'
        },
        LeafletService
      ],
      imports: [LeafletModule]
    })
      .overrideComponent(FootpathMapComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootpathMapComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should "buildLayers" correctly for waypoints', () => {
    componentUnderTest.waypoints = getFurtwangenFriedrichStreetToIlbenStreetWaypoints();

    const result: Layer[] = componentUnderTest.buildLayers();

    expect((result[0] as GeoJSON).getBounds()).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().getBounds());
    expect((result[0] as GeoJSON).feature).toEqual(getFurtwangenFriedrichStreetToIlbenStreetGeoJson().feature);
    expect(result[1]).toEqual(getArrivalMarker());
    expect(result[2]).toEqual(getDepartureMarker());
  });

});
