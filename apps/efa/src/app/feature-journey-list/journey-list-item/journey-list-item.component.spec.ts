import { JourneyListItemComponent } from './journey-list-item.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleTypePipe } from '../pipes/vehicle-type-pipe/vehicle-type.pipe';
import { DurationPipe } from '../pipes/duration-pipe/duration.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { LegListComponent } from '../leg-list/leg-list.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import {
  getFurtwangenToWaldkirchJourney,
  getGrosshausbergToFurtwangenIlbenstreetJourney
} from '../../shared/objectmothers/journey-object-mother';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';
import { expect } from '@jest/globals';
import { MatButtonHarness } from '@angular/material/button/testing';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';


describe('JourneyListItemComponent', () => {
  let componentUnderTest: JourneyListItemComponent;
  let fixture: ComponentFixture<JourneyListItemComponent>;
  let loader: HarnessLoader;

  describe('with IsOnlyFootpathPipe = false', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListItemComponent,
          MockComponent(LegListComponent),
          MockPipe(VehicleTypePipe, (value: string) => `mock:${value}`),
          MockPipe(DurationPipe, (value: Date) => `mock:${value}`)
        ],
        providers: [
          MockProvider(LOCALE_ID, 'de'),
          IsOnlyFootpathPipe
        ],
        imports: [
          SharedModule,
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

      const result: string = fixture.debugElement.nativeElement.querySelector('#transfers').innerHTML;

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

      const matButtonHarness = await loader.getHarness(MatButtonHarness.with({ selector: '#buyingButton' }));
      expect(await matButtonHarness.getText()).toBe('Kaufen');
    });

    it('should show no buttonSelectText when isJourneyBuyable = false', async () => {
      componentUnderTest.buttonSelectText = 'Rückfahrt';
      componentUnderTest.isJourneyBuyable = false;

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#buyingButton')).toBeNull();
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
      const emitJourneySelectedEventSpy = spyOn(componentUnderTest, 'emitJourneySelectedEvent');
      const selectButton = fixture.nativeElement.querySelector('#buyingButton');

      selectButton.click();

      expect(emitJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
    });
  });
});
