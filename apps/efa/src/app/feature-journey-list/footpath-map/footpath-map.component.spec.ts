import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootpathMapComponent } from './footpath-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MockComponent, MockPipe } from 'ng-mocks';
import { GeoJsonPipe } from '../pipes/geo-json-pipe/geo-json.pipe';
import { getFurtwangenFriedrichStreetToIlbenStreetGeoJson } from '../../shared/objectmothers/footpath-object-mother';
import { MapOptionsPipe } from '../pipes/map-options-pipe/map-options.pipe';
import { ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';

describe('FootpathMapComponent', () => {
  let componentUnderTest: FootpathMapComponent;
  let fixture: ComponentFixture<FootpathMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FootpathMapComponent,
        MockComponent(ThemeEmitterComponent),
        MockPipe(GeoJsonPipe, () => getFurtwangenFriedrichStreetToIlbenStreetGeoJson()),
        MapOptionsPipe
      ],
      imports: [LeafletModule]
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

  it('should show leaflet map when component initializes', () => {
    const leafletMap = fixture.nativeElement.querySelector('.map');
    expect(leafletMap).not.toBeNull();
  });

});
