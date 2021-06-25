import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListBackwardComponent } from './journey-list-backward.component';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { JourneyListItemComponent } from '../journey-list-item/journey-list-item.component';
import { FilterEqualJourneysPipe } from '../pipes/filter-equal-journey-pipe/filter-equal-journeys.pipe';
import { BackwardJourneyFilterPipe } from '../pipes/backward-journey-filter-pipe/backward-journey-filter.pipe';
import { JourneyListService } from '../services/journey-list.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import {
  getApiTokenParamMapWithIsRoundTripAsTrue,
  getApiTokenWithIsRoundTripAsTrue
} from '../../shared/objectmothers/api-token-object-mother';
import { expect } from '@jest/globals';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';
import {
  getFurtwangenToWaldkirchJourney,
  getFurtwangenToWaldkirchJourneyByArrivalTime,
  getGrosshausbergToFurtwangenIlbenstreetJourney
} from '../../shared/objectmothers/journey-object-mother';
import { TestScheduler } from 'rxjs/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SortJourneyPipe } from '../pipes/sort-journey-pipe/sort-journey.pipe';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { IsJourneyInPastPipe } from '../pipes/is-journey-in-past-pipe/is-journey-in-past.pipe';
import { NoJourneyResultComponent } from '../no-journey-result/no-journey-result.component';
import { JourneyListHeaderComponent } from '../journey-list-header/journey-list-header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

describe('JourneyListBackwardComponent', () => {
  let componentUnderTest: JourneyListBackwardComponent;
  let fixture: ComponentFixture<JourneyListBackwardComponent>;
  let journeyListService: JourneyListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JourneyListBackwardComponent,
        MockComponent(JourneyListItemComponent),
        MockComponent(NoJourneyResultComponent),
        MockComponent(JourneyListHeaderComponent),
        MockPipe(FilterEqualJourneysPipe, (journeys: JourneyFragment[]) => journeys),
        MockPipe(BackwardJourneyFilterPipe, (journeys: JourneyFragment[]) => journeys),
        MockPipe(SortJourneyPipe, (journeys: JourneyFragment[]) => journeys)
      ],
      providers: [
        MockProvider(JourneyListService),
        BackwardJourneyFilterPipe,
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
      imports: [
        MatProgressBarModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    window.scrollTo = jest.fn();
    fixture = TestBed.createComponent(JourneyListBackwardComponent);
    componentUnderTest = fixture.componentInstance;
    journeyListService = TestBed.inject(JourneyListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });

  it('"isJourneyBuyable" should return false when backwardJourney is in past', () => {
    const testFutureDate: Date = new Date();
    testFutureDate.setDate(testFutureDate.getDate() + 1);
    componentUnderTest.selectedOutwardJourney = getFurtwangenToWaldkirchJourneyByArrivalTime(testFutureDate);
    const testPastDate: Date = new Date('2020-09-30T13:08:00+02:00');
    const testJourneys: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(testPastDate);

    const result: boolean = componentUnderTest.isJourneyBuyable(testJourneys);

    expect(result).toBeFalsy();
  });

  it('"isJourneyBuyable" should return false when selectedOutwardJourney is in past', () => {
    const testPastDate: Date = new Date('2020-09-30T13:08:00+02:00');
    componentUnderTest.selectedOutwardJourney = getFurtwangenToWaldkirchJourneyByArrivalTime(testPastDate);
    const testFutureDate: Date = new Date();
    testFutureDate.setDate(testFutureDate.getDate() + 1);
    const testJourneys: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(testFutureDate);

    const result: boolean = componentUnderTest.isJourneyBuyable(testJourneys);

    expect(result).toBeFalsy();
  });

  it('should return false when selectedOutwardJourney and backwardJourney is only footpath', () => {
    const testFutureDate: Date = new Date();
    testFutureDate.setDate(testFutureDate.getDate() + 1);
    componentUnderTest.selectedOutwardJourney = getGrosshausbergToFurtwangenIlbenstreetJourney(testFutureDate);
    const testJourney: JourneyFragment = getGrosshausbergToFurtwangenIlbenstreetJourney(testFutureDate);

    const result: boolean = componentUnderTest.isJourneyBuyable(testJourney);

    expect(result).toBeFalsy();
  });

  it('should return true when neither selectedOutwardJourney and backwardJourney are in past nor are only footpaths', () => {
    const testFutureDate: Date = new Date();
    testFutureDate.setDate(testFutureDate.getDate() + 1);
    componentUnderTest.selectedOutwardJourney = getFurtwangenToWaldkirchJourneyByArrivalTime(testFutureDate);
    const testJourneys: JourneyFragment = getFurtwangenToWaldkirchJourneyByArrivalTime(testFutureDate);

    const result: boolean = componentUnderTest.isJourneyBuyable(testJourneys);

    expect(result).toBeTruthy();
  });

  it('should return correct dateTime for backwardJourney', () => {

    const result: Date = componentUnderTest.getJourneyDateTime();

    expect(result).toEqual(getApiTokenWithIsRoundTripAsTrue().backwardJourney.dateTime);
  });

  it('should return correct isArrivalDateTime for backwardJourney', () => {

    const result: boolean = componentUnderTest.getJourneyIsArrivalDateTime();

    expect(result).toBeTruthy();
  });

  it('should "passJourneySelectedEvent" with journey as param', () => {
    const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();
    let receivedJourney: JourneyFragment;
    componentUnderTest.journeySelectedEvent.subscribe((journey: JourneyFragment) => receivedJourney = journey);

    componentUnderTest.passJourneySelectedEvent(testJourney);

    expect(receivedJourney).toEqual(getFurtwangenToWaldkirchJourney());
  });

  it('should return "journeys$" when component is initialized', () => {
    spyOn(journeyListService, 'getBackwardJourneysBy').and.returnValue(of(
      [getFurtwangenToWaldkirchJourney()],
      getFurtwangenToWaldkirchJourney()
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

  it('should be called "getBackwardJourneysBy" from journeyListService with right params', (done) => {
    let counter = 0;
    const journeyListServiceSpy = spyOn(journeyListService, 'getBackwardJourneysBy')
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

  it('should show journeyListItems with correct input bindings when journeys are available', () => {
    componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney(), getFurtwangenToWaldkirchJourney()]);

    fixture.detectChanges();

    const journeyListItems: DebugElement[] = fixture.debugElement.queryAll(By.directive(JourneyListItemComponent));
    expect(journeyListItems.length).toBe(2);
    expect(journeyListItems[0].componentInstance.journey).toEqual(getFurtwangenToWaldkirchJourney());
    expect(journeyListItems[0].componentInstance.isJourneyBuyable).toBeFalsy();
    expect(journeyListItems[0].componentInstance.buttonSelectText).toBe('Kaufen');
    expect(journeyListItems[1].componentInstance.journey).toEqual(getFurtwangenToWaldkirchJourney());
    expect(journeyListItems[1].componentInstance.isJourneyBuyable).toBeFalsy();
    expect(journeyListItems[1].componentInstance.buttonSelectText).toBe('Kaufen');
  });

  it('should show no result message when journey results are zero and loading is wrong', async () => {
    componentUnderTest.journeys$.next([]);
    componentUnderTest.loading = false;

    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.directive(JourneyListItemComponent)).length).toBe(0);
    const noJourneyResultComponent: NoJourneyResultComponent = fixture.debugElement.query(By.directive(NoJourneyResultComponent)).componentInstance;
    expect(noJourneyResultComponent.noResultMessage).toBe('Rückfahrt zur Hinfahrt');
    expect(noJourneyResultComponent.isBackwardJourney).toBeTruthy();
  });

  it('should call "passJourneySelectedEvent" with right param when journeySelectedEvent is emitted', () => {
    const passJourneySelectedEventSpy = spyOn(componentUnderTest, 'passJourneySelectedEvent');
    componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney()]);
    fixture.detectChanges();
    const journeyListItem: JourneyListItemComponent = fixture.debugElement.query(By.directive(JourneyListItemComponent)).componentInstance;

    journeyListItem.journeySelectedEvent.emit(getFurtwangenToWaldkirchJourney());

    expect(passJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
    expect(passJourneySelectedEventSpy).toHaveBeenCalledWith(getFurtwangenToWaldkirchJourney());
  });
});
