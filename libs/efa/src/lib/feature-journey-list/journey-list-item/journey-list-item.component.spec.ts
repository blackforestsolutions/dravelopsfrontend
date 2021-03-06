import { JourneyListItemComponent } from './journey-list-item.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationPipe } from '../pipes/duration-pipe/duration.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { LegListComponent } from '../leg-list/leg-list.component';
import { By } from '@angular/platform-browser';
import {
  getFurtwangenToWaldkirchJourney,
  getGrosshausbergToFurtwangenIlbenstreetJourney
} from '../../domain/objectmothers/journey-object-mother';
import { JourneyFragment } from '../../domain/model/generated';
import { expect } from '@jest/globals';
import { MatButtonHarness } from '@angular/material/button/testing';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehicleTypeIconPipe } from '../pipes/vehicle-type-icon-pipe/vehicle-type-icon.pipe';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';


describe('JourneyListItemComponent', () => {
  let componentUnderTest: JourneyListItemComponent;
  let fixture: ComponentFixture<JourneyListItemComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JourneyListItemComponent,
        MockComponent(LegListComponent),
        MockPipe(VehicleTypeIconPipe, (value: string) => `mock:${value}`),
        MockPipe(DurationPipe, (value: Date) => `mock:${value}`)
      ],
      providers: [
        MockProvider(LOCALE_ID, 'de'),
        IsOnlyFootpathPipe
      ],
      imports: [
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
    registerLocaleData(localeDe);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyListItemComponent);
    componentUnderTest = fixture.componentInstance;
    componentUnderTest.journey = { ...getFurtwangenToWaldkirchJourney() };
    componentUnderTest.buttonSelectText = 'Kaufen';
    componentUnderTest.isJourneyBuyable = true;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('should create a equals to ten when journey is a footpath', () => {

    const result: number = componentUnderTest.getPrice();

    expect(result).toBe(10);
  });

  it('should create a equals to zero when journey is a footpath', () => {
    componentUnderTest.journey = getGrosshausbergToFurtwangenIlbenstreetJourney();

    const result: number = componentUnderTest.getPrice();

    expect(result).toBe(0);
  });

  it('should show seven icons', async () => {

    const result: MatIconHarness[] = await loader.getAllHarnesses<MatIconHarness>(MatIconHarness);

    expect(result.length).toBe(7);
  });

  it('should show the correct number of transfers', () => {

    const result: string = fixture.debugElement.nativeElement.querySelector('.transfers').innerHTML;

    expect(result).toBe('3');
  });

  it('should pass four legs to leg-list', () => {
    const expectedJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();
    const legListComponent: LegListComponent = fixture.debugElement.query(By.directive(LegListComponent)).componentInstance;

    expect(legListComponent.legs.length).toBe(4);
    expect(legListComponent.legs[0]).toEqual(expectedJourney.legs[0]);
    expect(legListComponent.legs[1]).toEqual(expectedJourney.legs[1]);
    expect(legListComponent.legs[2]).toEqual(expectedJourney.legs[2]);
    expect(legListComponent.legs[3]).toEqual(expectedJourney.legs[3]);
  });

  it('should show buttonSelectText when isJourneyBuyable = true', async () => {

    fixture.detectChanges();

    const matButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '.buying-button' }));
    expect(await matButtonHarness.isDisabled()).toBeFalsy();
    expect(await matButtonHarness.getText()).toBe('Kaufen');
  });

  it('should show disabled buttonSelectText when isJourneyBuyable = false', async () => {
    componentUnderTest.buttonSelectText = 'R??ckfahrt';
    componentUnderTest.isJourneyBuyable = false;

    fixture.detectChanges();

    const matButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '.buying-button' }));
    expect(await matButtonHarness.isDisabled()).toBeTruthy();
    expect(await matButtonHarness.getText()).toBe('R??ckfahrt');
  });

  it('should emit "journeySelectedEvent" when "emitJourneySelectedEvent" is called with journey payload', () => {
    let journeyResult: JourneyFragment;
    componentUnderTest.journeySelectedEvent.subscribe((journey: JourneyFragment) => {
      journeyResult = journey;
    });

    componentUnderTest.emitJourneySelectedEvent();

    expect(journeyResult).toEqual(getFurtwangenToWaldkirchJourney());
  });

  it('should be called "emitJourneySelectedEvent" when select button is clicked', () => {
    const emitJourneySelectedEventSpy = jest.spyOn(componentUnderTest, 'emitJourneySelectedEvent');
    const selectButton = fixture.nativeElement.querySelector('.buying-button');

    selectButton.click();

    expect(emitJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit "journeyExpandedEvent" when "emitJourneyExpandedEvent" is called with journey payload', (done) => {
    componentUnderTest.journeyExpandedEvent.subscribe((result: JourneyFragment) => {
      expect(result).toEqual(getFurtwangenToWaldkirchJourney());
      done();
    });

    componentUnderTest.emitJourneyExpandedEvent();
  });

  it('should be called "emitJourneyExpandedEvent" when expansion panel is expand', async () => {
    const emitJourneyExpandedEventSpy = jest.spyOn(componentUnderTest, 'emitJourneyExpandedEvent');
    const expansionPanel: MatExpansionPanelHarness = await loader.getHarness(MatExpansionPanelHarness);

    await expansionPanel.expand();

    expect(emitJourneyExpandedEventSpy).toHaveBeenCalledTimes(1);
  });
});
