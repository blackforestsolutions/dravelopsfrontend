import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchComponent } from './map-search.component';
import { PolygonPipe } from '../pipes/polygon-pipe/polygon.pipe';
import { MapOptionsPipe } from '../pipes/map-options-pipe/map-options.pipe';
import { MockComponent, MockProvider } from 'ng-mocks';
import { LoadingComponent, ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';
import { SharedModule } from '../../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PolygonApiService } from '../../shared/api/polygon-api.service';
import { expect } from '@jest/globals';
import { NearestTravelPointListComponent } from '../nearest-travel-point-list/nearest-travel-point-list.component';

describe('MapSearchComponent', () => {
  let componentUnderTest: MapSearchComponent;
  let fixture: ComponentFixture<MapSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MapSearchComponent,
        MockComponent(ThemeEmitterComponent),
        MockComponent(LoadingComponent),
        MockComponent(NearestTravelPointListComponent),
        PolygonPipe,
        MapOptionsPipe
      ],
      imports: [
        SharedModule,
        LeafletModule
      ],
      providers: [
        MockProvider(PolygonApiService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearchComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });
});
