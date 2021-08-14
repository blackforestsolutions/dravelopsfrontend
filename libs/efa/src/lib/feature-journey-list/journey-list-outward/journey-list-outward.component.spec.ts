import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyListOutwardComponent } from './journey-list-outward.component';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { JourneyListItemComponent } from '../journey-list-item/journey-list-item.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import {
  getApiTokenParamMapWithIsRoundTripAsFalse,
  getApiTokenParamMapWithIsRoundTripAsTrue,
  getApiTokenWithIsRoundTripAsTrue
} from '../../domain/objectmothers/api-token-object-mother';
import { JourneyListService } from '../services/journey-list.service';
import { FilterEqualJourneysPipe } from '../pipes/filter-equal-journey-pipe/filter-equal-journeys.pipe';
import { expect } from '@jest/globals';
import { JourneyFragment } from '../../domain/model/generated';
import {
  getFurtwangenToWaldkirchJourney,
  getFurtwangenToWaldkirchJourneyByArrivalTime,
  getGrosshausbergToFurtwangenIlbenstreetJourney,
  getWaldkirchToFurtwangenJourney
} from '../../domain/objectmothers/journey-object-mother';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SortJourneyPipe } from '../pipes/sort-journey-pipe/sort-journey.pipe';
import { IsOnlyFootpathPipe } from '../pipes/is-only-footpath-pipe/is-only-footpath.pipe';
import { IsJourneyInPastPipe } from '../pipes/is-journey-in-past-pipe/is-journey-in-past.pipe';
import { JourneyListHeaderComponent } from '../journey-list-header/journey-list-header.component';
import { NoJourneyResultComponent } from '../no-journey-result/no-journey-result.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { JourneyMapComponent } from '../journey-map/journey-map.component';
import { SHOW_JOURNEY_RESULT_MAP } from '@dravelopsfrontend/shared';
import { TestScheduler } from 'rxjs/testing';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dravelopssharedfrontendIfTabletView]'
})
class IfTabletViewDirective implements OnInit {
  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}

describe('JourneyListOutwardComponent', () => {
  let componentUnderTest: JourneyListOutwardComponent;
  let fixture: ComponentFixture<JourneyListOutwardComponent>;
  let journeyListService: JourneyListService;
  let loader: HarnessLoader;

  describe('with isRoundTrip = true and showJourneyResultMap = true', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListOutwardComponent,
          MockComponent(JourneyListItemComponent),
          MockComponent(JourneyListHeaderComponent),
          MockComponent(NoJourneyResultComponent),
          MockComponent(JourneyMapComponent),
          MockPipe(FilterEqualJourneysPipe, (journeys: JourneyFragment[]) => journeys),
          MockPipe(SortJourneyPipe, (journeys: JourneyFragment[]) => journeys),
          IfTabletViewDirective
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
          },
          {
            provide: SHOW_JOURNEY_RESULT_MAP,
            useValue: true
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

    it('should set "expandedJourney" when "setExpandedJourney" is called with journey', () => {
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();

      componentUnderTest.setExpandedJourney(testJourney);

      expect(componentUnderTest.expandedJourney).toEqual(testJourney);
    });

    it('should return "journeys$" when component is initialized', () => {
      jest.spyOn(journeyListService, 'getOutwardJourneysBy').mockReturnValue(of(
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
      const journeyListServiceSpy = jest.spyOn(journeyListService, 'getOutwardJourneysBy')
        .mockReturnValue(of([getFurtwangenToWaldkirchJourney()]));

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
      const noJourneyResultComponent: NoJourneyResultComponent = fixture.debugElement.query(By.directive(NoJourneyResultComponent)).componentInstance;
      expect(noJourneyResultComponent.noResultMessage).toBe('Hinfahrt');
      expect(noJourneyResultComponent.isBackwardJourney).toBeFalsy();
    });

    it('should call "passJourneySelectedEvent" with right param when journeySelectedEvent is emitted', () => {
      const passJourneySelectedEventSpy = jest.spyOn(componentUnderTest, 'passJourneySelectedEvent');
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney()]);
      fixture.detectChanges();
      const journeyListItem: JourneyListItemComponent = fixture.debugElement
        .query(By.directive(JourneyListItemComponent)).componentInstance;

      journeyListItem.journeySelectedEvent.emit(getFurtwangenToWaldkirchJourney());

      expect(passJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
      expect(passJourneySelectedEventSpy).toHaveBeenCalledWith(getFurtwangenToWaldkirchJourney());
    });

    it('should be called "setExpandedJourney" when "journeyExpandedEvent" is emitted', () => {
      const setExpandedJourneySpy = jest.spyOn(componentUnderTest, 'setExpandedJourney');
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney()]);
      fixture.detectChanges();
      const journeyListItem: JourneyListItemComponent = fixture.debugElement
        .query(By.directive(JourneyListItemComponent)).componentInstance;

      journeyListItem.journeyExpandedEvent.emit(getFurtwangenToWaldkirchJourney());

      expect(setExpandedJourneySpy).toHaveBeenCalledTimes(1);
      expect(setExpandedJourneySpy).toHaveBeenCalledWith(getFurtwangenToWaldkirchJourney());
    });

    it('should be passed default journey (first journey in list) to "JourneyMapComponent" when no journey is expanded', () => {
      componentUnderTest.expandedJourney = null;
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney(), getWaldkirchToFurtwangenJourney()]);

      fixture.detectChanges();

      const journeyMapComponent: JourneyMapComponent = fixture.debugElement.query(By.directive(JourneyMapComponent)).componentInstance;
      expect(journeyMapComponent.journey).toEqual(getFurtwangenToWaldkirchJourney());
    });

    it('should be passed expanded journey to "JourneyMapComponent" when journey is expanded', () => {
      componentUnderTest.expandedJourney = getWaldkirchToFurtwangenJourney();
      componentUnderTest.journeys$.next([getFurtwangenToWaldkirchJourney(), getWaldkirchToFurtwangenJourney()]);

      fixture.detectChanges();

      const journeyMapComponent: JourneyMapComponent = fixture.debugElement.query(By.directive(JourneyMapComponent)).componentInstance;
      expect(journeyMapComponent.journey).toEqual(getWaldkirchToFurtwangenJourney());
    });
  });

  describe('with isRoundTrip = false and showJourneyResultMap = false', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListOutwardComponent,
          MockComponent(JourneyListItemComponent),
          MockComponent(JourneyListHeaderComponent),
          MockComponent(NoJourneyResultComponent),
          MockComponent(JourneyMapComponent),
          MockPipe(FilterEqualJourneysPipe, (journeys: JourneyFragment[]) => journeys),
          MockPipe(SortJourneyPipe, (journeys: JourneyFragment[]) => journeys),
          IfTabletViewDirective
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
          },
          {
            provide: SHOW_JOURNEY_RESULT_MAP,
            useValue: false
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
