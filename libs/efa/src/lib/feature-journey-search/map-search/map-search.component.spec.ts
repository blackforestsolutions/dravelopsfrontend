import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchComponent } from './map-search.component';
import { PolygonPipe } from '../pipes/polygon-pipe/polygon.pipe';
import { MapOptionsPipe } from '../pipes/map-options-pipe/map-options.pipe';
import { MockComponent, MockDirective, MockProvider } from 'ng-mocks';
import { LoadingComponent, ThemeEmitterComponent } from '@dravelopsfrontend/shared';
import { LeafletDirective, LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PolygonApiService } from '../../domain/api/polygon-api.service';
import { expect } from '@jest/globals';
import { NearestTravelPointSearchComponent } from '../nearest-travel-point-search/nearest-travel-point-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { LeafletService } from '../../domain/util/leaflet.service';

describe('MapSearchComponent', () => {
  let componentUnderTest: MapSearchComponent;
  let fixture: ComponentFixture<MapSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MapSearchComponent,
        MockComponent(ThemeEmitterComponent),
        MockComponent(LoadingComponent),
        MockComponent(NearestTravelPointSearchComponent),
        MockDirective(LeafletDirective),
        PolygonPipe,
        MapOptionsPipe
      ],
      imports: [
        MatBottomSheetModule,
        LeafletModule,
        RouterTestingModule
      ],
      providers: [
        MockProvider(PolygonApiService),
        MockProvider(LeafletService)
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
