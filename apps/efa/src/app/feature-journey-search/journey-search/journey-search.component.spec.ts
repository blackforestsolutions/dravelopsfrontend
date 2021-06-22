import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneySearchComponent } from './journey-search.component';
import { SharedModule } from '../../shared/shared.module';
import { MockComponent } from 'ng-mocks';
import { StartpageComponent } from '../startpage/startpage.component';
import { MapSearchComponent } from '../map-search/map-search.component';
import { JourneySearchFormComponent } from '../journey-search-form/journey-search-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NearestTravelPointFragment } from '@dravelopsfrontend/generated-content';
import { getFurtwangenKindergardenTravelPoint } from '../../shared/objectmothers/travel-point-object-mother';
import { ApiToken } from '../../shared/model/api-token';
import { getApiTokenWithIsRoundTripAsTrue } from '../../shared/objectmothers/api-token-object-mother';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { expect } from '@jest/globals';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';


describe('JourneySearchComponent', () => {
  let componentUnderTest: JourneySearchComponent;
  let fixture: ComponentFixture<JourneySearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JourneySearchComponent,
        MockComponent(StartpageComponent),
        MockComponent(MapSearchComponent),
        MockComponent(JourneySearchFormComponent)
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneySearchComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
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

  it('should show StartPageComponent and not MapSearchComponent when component is initialized', () => {
    const mapSearchComponent: DebugElement = fixture.debugElement.query(By.directive(MapSearchComponent));
    const startPageComponent: DebugElement = fixture.debugElement.query(By.directive(StartpageComponent));

    expect(mapSearchComponent).toBeNull();
    expect(startPageComponent).not.toBeNull();
  });

  it('should show MapSearchComponent and not StartPageComponent when tab label "Kartensuche" is pressed', async () => {
    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);

    await matTabGroup.selectTab({ label: 'Kartensuche' });

    fixture.detectChanges();
    const mapSearchComponent: DebugElement = fixture.debugElement.query(By.directive(MapSearchComponent));
    const startPageComponent: DebugElement = fixture.debugElement.query(By.directive(StartpageComponent));
    expect(mapSearchComponent).not.toBeNull();
    expect(startPageComponent).toBeNull();
  });

  it('should show StartPageComponent and not MapSearchComponent when tab label "Kartensuche" is pressed', async () => {
    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);

    await matTabGroup.selectTab({ label: 'Kartensuche' });
    await matTabGroup.selectTab({ label: 'Verbindungssuche'});

    fixture.detectChanges();
    const mapSearchComponent: DebugElement = fixture.debugElement.query(By.directive(MapSearchComponent));
    const startPageComponent: DebugElement = fixture.debugElement.query(By.directive(StartpageComponent));
    expect(mapSearchComponent).toBeNull();
    expect(startPageComponent).not.toBeNull();
  });

  it('should update "departureTravelPoint" from JourneySearchFormComponent when MapSearchComponent triggers departureSelectEvent', async () => {
    const selectedTestValue: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();
    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);
    await matTabGroup.selectTab({ label: 'Kartensuche' });
    fixture.detectChanges();
    const mapSearchComponent: MapSearchComponent = fixture.debugElement.query(By.directive(MapSearchComponent)).componentInstance;

    mapSearchComponent.departureSelectEvent.emit(selectedTestValue);

    fixture.detectChanges();
    const journeySearchFormComponent: JourneySearchFormComponent = fixture.debugElement.query(By.directive(JourneySearchFormComponent)).componentInstance;
    expect(journeySearchFormComponent.departureTravelPoint).toEqual(selectedTestValue);
  });

  it('should update "arrivalTravelPoint" from JourneySearchFormComponent when MapSearchComponent triggers arrivalSelectEvent', async () => {
    const selectedTestValue: NearestTravelPointFragment = getFurtwangenKindergardenTravelPoint();
    const matTabGroup: MatTabGroupHarness = await loader.getHarness(MatTabGroupHarness);
    await matTabGroup.selectTab({ label: 'Kartensuche' });
    fixture.detectChanges();
    const mapSearchComponent: MapSearchComponent = fixture.debugElement.query(By.directive(MapSearchComponent)).componentInstance;

    mapSearchComponent.arrivalSelectEvent.emit(selectedTestValue);

    fixture.detectChanges();
    const journeySearchFormComponent: JourneySearchFormComponent = fixture.debugElement.query(By.directive(JourneySearchFormComponent)).componentInstance;
    expect(journeySearchFormComponent.arrivalTravelPoint).toEqual(selectedTestValue);
  });
});
