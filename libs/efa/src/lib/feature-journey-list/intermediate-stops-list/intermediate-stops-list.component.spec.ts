import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateStopsListComponent } from './intermediate-stops-list.component';
import { getFurtwangenIlbenstreetToBleibachLeg } from '../../domain/objectmothers/leg-object-mother';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import {
  getGuetenbachTownHallTravelPoint,
  getSimonswaldTownHallTravelPoint
} from '../../domain/objectmothers/travel-point-object-mother';
import { MatIconModule } from '@angular/material/icon';
import { MockProvider } from 'ng-mocks';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

describe('IntermediateStopsListComponent', () => {
  let componentUnderTest: IntermediateStopsListComponent;
  let fixture: ComponentFixture<IntermediateStopsListComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IntermediateStopsListComponent
      ],
      providers: [
        MockProvider(LOCALE_ID, 'de')
      ],
      imports: [
        MatIconModule
      ]
    })
      .compileComponents();
    registerLocaleData(localeDe);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateStopsListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.leg = getFurtwangenIlbenstreetToBleibachLeg();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should show correct number of intermediate stops with correct displayed properties', async () => {
    componentUnderTest.leg = getFurtwangenIlbenstreetToBleibachLeg();

    fixture.detectChanges();

    const arrowDownwardIcons: MatIconHarness[] = await loader.getAllHarnesses(MatIconHarness.with({
      name: 'arrow_downward'
    }));
    const stopNames = fixture.nativeElement.querySelectorAll('.intermediateStopName');
    const stopArrivalTimes = fixture.nativeElement.querySelectorAll('.intermediateStopArrivalTime');
    const delays = fixture.nativeElement.querySelectorAll('.delay');
    expect(arrowDownwardIcons.length).toBe(2);
    expect(stopNames.length).toBe(2);
    expect(stopNames[0].innerHTML).toBe(getGuetenbachTownHallTravelPoint().name);
    expect(stopNames[1].innerHTML).toBe(getSimonswaldTownHallTravelPoint().name);
    expect(stopArrivalTimes.length).toBe(2);
    expect(delays.length).toBe(0);
  });

  it('should show delay correctly', () => {
    componentUnderTest.leg = {
      ...getFurtwangenIlbenstreetToBleibachLeg(),
      delayInMinutes: 2
    };

    fixture.detectChanges();

    const delays = fixture.nativeElement.querySelectorAll('.delay');
    expect(delays.length).toBe(2);
    expect(delays[0].innerHTML).toBe(' +2');
    expect(delays[1].innerHTML).toBe(' +2');
  });
});
