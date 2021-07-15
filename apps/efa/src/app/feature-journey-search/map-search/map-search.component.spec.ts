import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchComponent } from './map-search.component';
import { PolygonPipe } from '../pipes/polygon-pipe/polygon.pipe';
import { MapOptionsPipe } from '../pipes/map-options-pipe/map-options.pipe';
import { MockComponent, MockDirective, MockProvider } from 'ng-mocks';
import { LoadingComponent, ThemeEmitterComponent } from '@dravelopsfrontend/shared-styles';
import { LeafletDirective, LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PolygonApiService } from '../../shared/api/polygon-api.service';
import { expect } from '@jest/globals';
import { NearestTravelPointListComponent } from '../nearest-travel-point-list/nearest-travel-point-list.component';
import { CUSTOMER_DIRECTORY } from '../../../environments/config-tokens';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { LeafletService } from '../../shared/util/leaflet.service';

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
        MockProvider(LeafletService),
        {
          provide: CUSTOMER_DIRECTORY,
          useValue: 'bw'
        }
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
