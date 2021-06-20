import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListOutwardComponent } from './journey-list-outward.component';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { JourneyListItemComponent } from '../journey-list-item/journey-list-item.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import {
  getApiTokenParamMapWithIsRoundTripAsFalse,
  getApiTokenParamMapWithIsRoundTripAsTrue,
  getApiTokenWithIsRoundTripAsTrue
} from '../../shared/objectmothers/api-token-object-mother';
import { JourneyListService } from '../services/journey-list.service';
import { FilterEqualJourneysPipe } from '../pipes/filter-equal-journey-pipe/filter-equal-journeys.pipe';
import { expect } from '@jest/globals';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';
import {
  getFurtwangenToWaldkirchJourney,
  getFurtwangenToWaldkirchJourneyByArrivalTime,
  getGrosshausbergToFurtwangenIlbenstreetJourney
} from '../../shared/objectmothers/journey-object-mother';
import { TestScheduler } from 'rxjs/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SortJourneyPipe } from '../pipes/sort-journey-pipe/sort-journey.pipe';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { IsJourneyInPastPipe } from '../pipes/is-journey-in-past-pipe/is-journey-in-past.pipe';


describe('JourneyListOutwardComponent', () => {
  let componentUnderTest: JourneyListOutwardComponent;
  let fixture: ComponentFixture<JourneyListOutwardComponent>;
  let journeyListService: JourneyListService;
  let loader: HarnessLoader;

  describe('with isRoundTrip = true', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListOutwardComponent,
          MockComponent(JourneyListItemComponent),
          MockPipe(FilterEqualJourneysPipe, (journeys: JourneyFragment[]) => journeys),
          MockPipe(SortJourneyPipe, (journeys: JourneyFragment[]) => journeys)
        ],
        providers: [
          MockProvider(JourneyListService),
          IsOnlyFootpathPipe,
          IsJourneyInPastPipe,
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue())),
              snapshot: {
                paramMap: convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue())
              }
            }
          }
        ],
        imports: [SharedModule]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(JourneyListOutwardComponent);
      componentUnderTest = fixture.componentInstance;
      journeyListService = TestBed.inject(JourneyListService);
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('"isJourneyBuyable" should return true when search isRoundTrip', () => {
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();

      const result: boolean = componentUnderTest.isJourneyBuyable(testJourney);

      expect(result).toBeTruthy();
    });

    it('should return "Hinfahrt" as round trip text', () => {

      const result: string = componentUnderTest.getIsRoundTripText();

      expect(result).toBe('Hinfahrt');
    });

    it('should return correct dateTime for outwardJourney', () => {

      const result: Date = componentUnderTest.getJourneyDateTime();

      expect(result).toEqual(getApiTokenWithIsRoundTripAsTrue().outwardJourney.dateTime);
    });

    it('should return correct isArrivalDateTime for outwardJourney', () => {

      const result: boolean = componentUnderTest.getJourneyIsArrivalDateTime();

      expect(result).toBeTruthy();
    });

    it('should return "Rückfahrt" as button select text', () => {

      const result: string = componentUnderTest.getButtonSelectText();

      expect(result).toBe('Rückfahrt');
    });

    it('should "passJourneySelectedEvent" with journey as param', () => {
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();
      let receivedJourney: JourneyFragment;
      componentUnderTest.journeySelectedEvent.subscribe((journey: JourneyFragment) => receivedJourney = journey);

      componentUnderTest.passJourneySelectedEvent(testJourney);

      expect(receivedJourney).toEqual(getFurtwangenToWaldkirchJourney());
    });

    it('should return "journeys$" when component is initialized', () => {
      spyOn(journeyListService, 'getOutwardJourneysBy').and.returnValue(of(
        getFurtwangenToWaldkirchJourney(),
        [getFurtwangenToWaldkirchJourney()]
      ));

      const scheduler: TestScheduler = new TestScheduler(((actual, expected) => expect(actual).toEqual(expected)));
      scheduler.run(({ expectObservable, cold }) => {
        cold('ab').subscribe(() => componentUnderTest.ngOnInit());
        const expectedMarble = '-(abc)';
        const expectedJourneys = {
          a: null,
          b: [getFurtwangenToWaldkirchJourney()],
          c: [getFurtwangenToWaldkirchJourney(), getFurtwangenToWaldkirchJourney()]
        };
        expectObservable(componentUnderTest.journeys$).toBe(expectedMarble, expectedJourneys);
      });
    });

    it('should be called "getOutwardJourneysBy" from journeyListService with right params', (done) => {
      let counter = 0;
      const journeyListServiceSpy = spyOn(journeyListService, 'getOutwardJourneysBy')
        .and.returnValue(of([getFurtwangenToWaldkirchJourney()]));

      componentUnderTest.journeys$.subscribe({
        next: () => {
          if (counter === 1) {
            expect(journeyListServiceSpy).toHaveBeenCalledTimes(1);
            expect(journeyListServiceSpy).toHaveBeenCalledWith(
              convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue()),
              expect.anything()
            );
            done();
          } else {
            counter++;
          }
        }
      });

      componentUnderTest.ngOnInit();
    });

    it('should show results of method "getIsRoundTripText" and "getJourneyDateTime" in template when component is initialized', () => {
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney(), getFurtwangenToWaldkirchJourney()]);

      fixture.detectChanges();

      const dateField = fixture.nativeElement.querySelector('.date');
      expect(dateField.innerHTML).toBe('Hinfahrt am Sep 30, 2020');
    });

    it('should show progressbar when component is initialized', async () => {
      const progressBarHarness: MatProgressBarHarness = await loader.getHarness(MatProgressBarHarness);

      expect(progressBarHarness).not.toBeNull();
    });

    it('should show journeyListItems with correct input bindings when journeys are available', () => {
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney(), getFurtwangenToWaldkirchJourney()]);

      fixture.detectChanges();

      const journeyListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(JourneyListItemComponent));
      expect(journeyListItems.length).toBe(2);
      expect(journeyListItems[0].componentInstance.journey).toEqual(getFurtwangenToWaldkirchJourney());
      expect(journeyListItems[0].componentInstance.isJourneyBuyable).toBeTruthy();
      expect(journeyListItems[0].componentInstance.buttonSelectText).toBe('Rückfahrt');
      expect(journeyListItems[1].componentInstance.journey).toEqual(getFurtwangenToWaldkirchJourney());
      expect(journeyListItems[1].componentInstance.isJourneyBuyable).toBeTruthy();
      expect(journeyListItems[1].componentInstance.buttonSelectText).toBe('Rückfahrt');
    });

    it('should show no result message when journey results are zero and loading is wrong', async () => {
      componentUnderTest.journeys$.next([]);
      componentUnderTest.loading = false;

      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.directive(JourneyListItemComponent)).length).toBe(0);
      expect(fixture.nativeElement.querySelector('#no-result').innerHTML).toBe('Es wurde keine Hinfahrt gefunden.');
      expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeNull();
    });

    it('should call "passJourneySelectedEvent" with right param when journeySelectedEvent is emitted', () => {
      const passJourneySelectedEventSpy = spyOn(componentUnderTest, 'passJourneySelectedEvent');
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney()]);
      fixture.detectChanges();
      const journeyListItem: JourneyListItemComponent = fixture.debugElement
        .query(By.directive(JourneyListItemComponent)).componentInstance;

      journeyListItem.journeySelectedEvent.emit(getFurtwangenToWaldkirchJourney());

      expect(passJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
      expect(passJourneySelectedEventSpy).toHaveBeenCalledWith(getFurtwangenToWaldkirchJourney());
    });
  });

  describe('with isRoundTrip = false', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListOutwardComponent,
          MockComponent(JourneyListItemComponent),
          MockPipe(FilterEqualJourneysPipe, (journeys: JourneyFragment[]) => journeys),
          MockPipe(SortJourneyPipe, (journeys: JourneyFragment[]) => journeys)
        ],
        providers: [
          MockProvider(JourneyListService),
          IsOnlyFootpathPipe,
          IsJourneyInPastPipe,
          {
            provide: ActivatedRoute,
            useValue: {
              paramMap: of(convertToParamMap(getApiTokenParamMapWithIsRoundTripAsFalse())),
              snapshot: {
                paramMap: convertToParamMap(getApiTokenParamMapWithIsRoundTripAsFalse())
              }
            }
          }
        ],
        imports: [SharedModule]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(JourneyListOutwardComponent);
      componentUnderTest = fixture.componentInstance;
      journeyListService = TestBed.inject(JourneyListService);
      fixture.detectChanges();
    });

    it('"isJourneyBuyable" should return false when journey is in past', () => {
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(new Date('2020-09-30T13:08:00+02:00'));

      const result: boolean = componentUnderTest.isJourneyBuyable(testJourney);

      expect(result).toBeFalsy();
    });

    it('"isJourneyBuyable" should return false when journey is only a footpath', () => {
      const testJourney: JourneyFragment = getGrosshausbergToFurtwangenIlbenstreetJourney();

      const result: boolean = componentUnderTest.isJourneyBuyable(testJourney);

      expect(result).toBeFalsy();
    });

    it('"isJourneyBuyable" should return true when journey is neither in past nor a walk', () => {
      const testDate: Date = new Date();
      testDate.setDate(testDate.getDate() + 1);
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(testDate);

      const result: boolean = componentUnderTest.isJourneyBuyable(testJourney);

      expect(result).toBeTruthy();
    });

    it('should return "Fahrt" as round trip text', () => {

      const result: string = componentUnderTest.getIsRoundTripText();

      expect(result).toBe('Fahrt');
    });

    it('should return "Kaufen" as button select text', () => {

      const result: string = componentUnderTest.getButtonSelectText();

      expect(result).toBe('Kaufen');
    });
  });
})
;
