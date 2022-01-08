import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneySearchComponent } from './journey-search.component';
import { MockComponent } from 'ng-mocks';
import { StartpageComponent } from '../startpage/startpage.component';
import { MapSearchComponent } from '../map-search/map-search.component';
import { JourneySearchFormContainerComponent } from '../journey-search-form-container/journey-search-form-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NearestTravelPointFragment } from '../../domain/model/generated';
import { getFurtwangenKindergardenTravelPoint } from '../../domain/objectmothers/travel-point-object-mother';
import { ApiToken } from '../../domain/model/api-token';
import { getApiTokenWithIsRoundTripAsTrue } from '../../domain/objectmothers/api-token-object-mother';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { expect } from '@jest/globals';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTabsModule } from '@angular/material/tabs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';

const testDesktopView: BreakpointState = {
  matches: true,
  breakpoints: {
    '850px': true
  }
};

const testTouchView: BreakpointState = {
  matches: false,
  breakpoints: {
    '850px': false
  }
};


describe('JourneySearchComponent', () => {
  let breakpointObserver: BreakpointObserver;

  let componentUnderTest: JourneySearchComponent;
  let fixture: ComponentFixture<JourneySearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JourneySearchComponent,
        MockComponent(StartpageComponent),
        MockComponent(MapSearchComponent),
        MockComponent(JourneySearchFormContainerComponent)
      ],
      imports: [
        MatTabsModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneySearchComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    breakpointObserver = TestBed.inject(BreakpointObserver);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should set "selectedDeparture" when "handleDepartureSelectEvent" is called', () => {
    const selectedTestValue: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();

    componentUnderTest.handleDepartureSelectEvent(selectedTestValue);

    expect(componentUnderTest.selectedDeparture).toEqual(selectedTestValue);
  });

  it('should set "selectedArrival" when "handleArrivalSelectEvent" is called', () => {
    const selectedTestValue: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();

    componentUnderTest.handleArrivalSelectEvent(selectedTestValue);

    expect(componentUnderTest.selectedArrival).toEqual(selectedTestValue);
  });

  it('"passSubmitApiTokenEvent" should emit "submitApiTokenEvent"', (done) => {
    const testApiToken: ApiToken = getApiTokenWithIsRoundTripAsTrue();

    componentUnderTest.submitApiTokenEvent.subscribe((result: ApiToken) => {
      expect(result).toEqual(testApiToken);
      done();
    });

    componentUnderTest.passSubmitApiTokenEvent(testApiToken);
  });

  it('should show StartPageComponent when component is initialized with touch view', () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(testTouchView));

    componentUnderTest.ngOnInit();

    expect(fixture.debugElement.query(By.directive(MapSearchComponent))).toBeNull();
    expect(fixture.debugElement.query(By.directive(StartpageComponent))).toBeTruthy();
  });

  it('should show StartPageComponent when component is initialized with desktop view', () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(testDesktopView));

    componentUnderTest.ngOnInit();

    expect(fixture.debugElement.query(By.directive(MapSearchComponent))).toBeNull();
    expect(fixture.debugElement.query(By.directive(StartpageComponent))).toBeTruthy();
  });

  it('should show MapSearchComponent when tab label "Kartensuche" is pressed in desktop view', async () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(testDesktopView));
    componentUnderTest.ngOnInit();

    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);
    await matTabGroup.selectTab({ label: 'Kartensuche' });

    const mapSearchComponent: DebugElement = fixture.debugElement.query(By.directive(MapSearchComponent));
    const startPageComponent: DebugElement = fixture.debugElement.query(By.directive(StartpageComponent));
    expect(mapSearchComponent).not.toBeNull();
    expect(startPageComponent).toBeNull();
  });

  it('should show StartPageComponent when tab label "Verbindungssuche" is pressed in touch view', async () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(testDesktopView));
    componentUnderTest.ngOnInit();

    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);
    await matTabGroup.selectTab({ label: 'Kartensuche' });
    await matTabGroup.selectTab({ label: 'Verbindungssuche' });

    const mapSearchComponent: DebugElement = fixture.debugElement.query(By.directive(MapSearchComponent));
    const startPageComponent: DebugElement = fixture.debugElement.query(By.directive(StartpageComponent));
    expect(mapSearchComponent).toBeNull();
    expect(startPageComponent).not.toBeNull();
  });

  it('should update "departureTravelPoint" from JourneySearchFormContainerComponent when MapSearchComponent triggers departureSelectEvent', async () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(testDesktopView));
    componentUnderTest.ngOnInit();
    const selectedTestValue: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();
    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);
    await matTabGroup.selectTab({ label: 'Kartensuche' });
    const mapSearchComponent: MapSearchComponent = fixture.debugElement.query(By.directive(MapSearchComponent)).componentInstance;

    mapSearchComponent.departureSelectEvent.emit(selectedTestValue);

    fixture.detectChanges();
    const journeySearchFormContainerComponent: JourneySearchFormContainerComponent = fixture.debugElement.query(By.directive(JourneySearchFormContainerComponent)).componentInstance;
    expect(journeySearchFormContainerComponent.departureTravelPoint).toEqual(selectedTestValue);
  });

  it('should update "arrivalTravelPoint" from JourneySearchFormContainerComponent when MapSearchComponent triggers arrivalSelectEvent', async () => {
    jest.spyOn(breakpointObserver, 'observe').mockReturnValue(of(testDesktopView));
    componentUnderTest.ngOnInit();
    const selectedTestValue: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();
    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);
    await matTabGroup.selectTab({ label: 'Kartensuche' });
    const mapSearchComponent: MapSearchComponent = fixture.debugElement.query(By.directive(MapSearchComponent)).componentInstance;

    mapSearchComponent.arrivalSelectEvent.emit(selectedTestValue);

    fixture.detectChanges();
    const journeySearchFormContainerComponent: JourneySearchFormContainerComponent = fixture.debugElement.query(By.directive(JourneySearchFormContainerComponent)).componentInstance;
    expect(journeySearchFormContainerComponent.arrivalTravelPoint).toEqual(selectedTestValue);
  });
});
