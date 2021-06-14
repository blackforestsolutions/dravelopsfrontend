import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JourneyListComponent } from './journey-list.component';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { JourneyFragment } from '@dravelopsfrontend/generated-content';
import {
  getApiTokenParamMapWithIsRoundTripAsFalse,
  getApiTokenParamMapWithIsRoundTripAsTrue
} from '../../shared/objectmothers/api-token-object-mother';
import { SharedModule } from '../../shared/shared.module';
import { JourneyListOutwardComponent } from '../journey-list-outward/journey-list-outward.component';
import { JourneyListBackwardComponent } from '../journey-list-backward/journey-list-backward.component';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { getFurtwangenToWaldkirchJourney, getWaldkirchToFurtwangenJourney } from '../../shared/objectmothers/journey-object-mother';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Location } from '@angular/common';

@Component({ template: '' })
// for testing purpose
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BookingComponentStub {
}

describe('JourneyListComponent ', () => {
  let componentUnderTest: JourneyListComponent;
  let fixture: ComponentFixture<JourneyListComponent>;
  let location: Location;


  describe('with isRoundTrip = true ', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListComponent,
          BookingComponentStub,
          MockComponent(JourneyListOutwardComponent),
          MockComponent(JourneyListBackwardComponent)
        ],
        providers: [
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
        imports: [SharedModule, RouterTestingModule.withRoutes([
          {
            path: 'booking/:isRoundTrip/:outwardJourneyId/:backwardJourneyId',
            component: BookingComponentStub
          }
        ])]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(JourneyListComponent);
      componentUnderTest = fixture.componentInstance;
      location = TestBed.inject(Location);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('should init dom correctly', () => {
      const outwardJourneyList: JourneyListOutwardComponent = fixture.debugElement
        .query(By.directive(JourneyListOutwardComponent)).componentInstance;
      const backwardJourneyList: DebugElement = fixture.debugElement.query(By.directive(JourneyListBackwardComponent));

      expect(outwardJourneyList).toBeInstanceOf(JourneyListOutwardComponent);
      expect(backwardJourneyList).toBeNull();
    });

    it('should reset component correctly', () => {
      componentUnderTest.selectedOutwardJourney = undefined;

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.selectedOutwardJourney).toBeNull();
    });

    it('should set selectedOutwardJourney when "handleOutwardJourneySelectedEvent" is called with a journey', () => {
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();

      componentUnderTest.handleOutwardJourneySelectedEvent(testJourney);

      expect(componentUnderTest.selectedOutwardJourney).toEqual(testJourney);
    });

    it('should navigate to booking api when "handleBackwardJourneySelectedEvent" is called with a outwardJourney"', waitForAsync(() => {
      const outwardTestJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();
      const backwardTestJourney: JourneyFragment = getWaldkirchToFurtwangenJourney();
      componentUnderTest.selectedOutwardJourney = outwardTestJourney;

      componentUnderTest.handleBackwardJourneySelectedEvent(backwardTestJourney);

      fixture.whenStable().then(() => {
        expect(componentUnderTest.selectedOutwardJourney).toEqual(outwardTestJourney);
        expect(location.path()).toEqual(`/booking/${true}/${outwardTestJourney.id}/${backwardTestJourney.id}`);
      });
    }));

    it('should be called "handleOutwardJourneySelectedEvent" when "journeySelectedEvent " is emitted', () => {
      const handleOutwardJourneySelectedEventSpy = spyOn(componentUnderTest, 'handleOutwardJourneySelectedEvent');
      const journeyListOutward: JourneyListOutwardComponent = fixture.debugElement
        .query(By.directive(JourneyListOutwardComponent)).componentInstance;

      journeyListOutward.journeySelectedEvent.emit(getFurtwangenToWaldkirchJourney());

      expect(handleOutwardJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
      expect(handleOutwardJourneySelectedEventSpy).toHaveBeenCalledWith(getFurtwangenToWaldkirchJourney());
    });

    it('should not be visible "JourneyListOutwardComponent" when "journeySelectedEvent " is emitted', () => {
      const journeyListOutward: JourneyListOutwardComponent = fixture.debugElement
        .query(By.directive(JourneyListOutwardComponent)).componentInstance;

      journeyListOutward.journeySelectedEvent.emit(getFurtwangenToWaldkirchJourney());
      fixture.detectChanges();

      const journeyListOutwardDebugElement: DebugElement = fixture.debugElement.query(By.directive(JourneyListOutwardComponent));
      expect(journeyListOutwardDebugElement).toBeNull();
    });

    it('should be visible "JourneyListBackwardComponent" with correct input bindings when "journeySelectedEvent " is emitted', () => {
      const journeyListOutward: JourneyListOutwardComponent = fixture.debugElement
        .query(By.directive(JourneyListOutwardComponent)).componentInstance;

      journeyListOutward.journeySelectedEvent.emit(getFurtwangenToWaldkirchJourney());
      fixture.detectChanges();

      const journeyListBackward: JourneyListBackwardComponent = fixture.debugElement
        .query(By.directive(JourneyListBackwardComponent)).componentInstance;
      expect(journeyListBackward).toBeInstanceOf(JourneyListBackwardComponent);
      expect(journeyListBackward.selectedOutwardJourney).toEqual(getFurtwangenToWaldkirchJourney());
    });

    it('should be called "handleBackwardJourneySelectedEvent" when "journeySelectedEvent " is emitted', () => {
      componentUnderTest.selectedOutwardJourney = getFurtwangenToWaldkirchJourney();
      fixture.detectChanges();
      const handleBackwardJourneySelectedEventSpy = spyOn(componentUnderTest, 'handleBackwardJourneySelectedEvent');
      const journeyListBackward: JourneyListBackwardComponent = fixture.debugElement
        .query(By.directive(JourneyListBackwardComponent)).componentInstance;

      journeyListBackward.journeySelectedEvent.emit(getWaldkirchToFurtwangenJourney());

      expect(handleBackwardJourneySelectedEventSpy).toHaveBeenCalledTimes(1);
      expect(handleBackwardJourneySelectedEventSpy).toHaveBeenCalledWith(getWaldkirchToFurtwangenJourney());
    });

  });

  describe('with isRoundTrip = false ', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          JourneyListComponent,
          BookingComponentStub,
          MockComponent(JourneyListOutwardComponent),
          MockComponent(JourneyListBackwardComponent)
        ],
        providers: [
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
        imports: [SharedModule, RouterTestingModule.withRoutes([
          {
            path: 'booking/:isRoundTrip/:outwardJourneyId',
            component: BookingComponentStub
          }
        ])]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(JourneyListComponent);
      componentUnderTest = fixture.componentInstance;
      location = TestBed.inject(Location);
      fixture.detectChanges();
    });

    it('should init dom correctly', () => {
      const outwardJourneyList: JourneyListOutwardComponent = fixture.debugElement
        .query(By.directive(JourneyListOutwardComponent)).componentInstance;
      const backwardJourneyList: DebugElement = fixture.debugElement.query(By.directive(JourneyListBackwardComponent));

      expect(outwardJourneyList).toBeInstanceOf(JourneyListOutwardComponent);
      expect(backwardJourneyList).toBeNull();
    });

    it('should navigate to booking api when "handleOutwardJourneySelectedEvent" is called with a journey', waitForAsync(() => {
      const testJourney: JourneyFragment = getFurtwangenToWaldkirchJourney();

      componentUnderTest.handleOutwardJourneySelectedEvent(testJourney);

      fixture.whenStable().then(() => {
        expect(componentUnderTest.selectedOutwardJourney).toBeNull();
        expect(location.path()).toEqual(`/booking/${false}/${testJourney.id}`);
      });
    }));
  });
});
