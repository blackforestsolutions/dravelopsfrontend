import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookingComponent } from './booking.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

type ApiToken = {
  isRoundTrip: boolean;
  outwardJourneyId: string;
  backwardJourneyId: string;
};

const getApiTokenParamMapWithIsRoundTripAsTrue = (): ApiToken => {
  return {
    isRoundTrip: true,
    outwardJourneyId: '04e11b67-5085-48d1-92a4-c549a673954b',
    backwardJourneyId: 'c1094660-ccbd-420a-b344-4569b0ae47e2'
  };
};

const getApiTokenParamMapWithIsRoundTripAsFalse = (): ApiToken => {
  return {
    isRoundTrip: false,
    outwardJourneyId: '04e11b67-5085-48d1-92a4-c549a673954b',
    backwardJourneyId: ''
  };
};

describe('BookingComponent', () => {

  let componentUnderTest: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  describe('with isRoundTrip = true', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookingComponent],
        providers: [{
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue())
            }
          }
        }]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookingComponent);
      componentUnderTest = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(componentUnderTest).toBeTruthy();
    });

    it('should return isRoundTrip from route path', () => {

      const result: boolean = componentUnderTest.logIsRoundTrip();

      expect(result).toBeTruthy();
    });


    it('should return outwardJourneyId from route path', () => {

      const result: string = componentUnderTest.logOutwardJourneyId();

      expect(result).toBe(getApiTokenParamMapWithIsRoundTripAsTrue().outwardJourneyId);
    });

    it('should return backwardJourneyId from route path', () => {

      const result: string = componentUnderTest.logBackwardJourneyId();

      expect(result).toBe(getApiTokenParamMapWithIsRoundTripAsTrue().backwardJourneyId);
    });

    it('should be called "logIsRoundTrip" when change detection is triggered', waitForAsync(() => {
      const logIsRoundTripSpy = jest.spyOn(componentUnderTest, 'logIsRoundTrip');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(logIsRoundTripSpy).toHaveBeenCalledTimes(2);
      });
    }));

    it('should be called "logOutwardJourneyId" when change detection is triggered', waitForAsync(() => {
      const logOutwardJourneyIdSpy = jest.spyOn(componentUnderTest, 'logOutwardJourneyId');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(logOutwardJourneyIdSpy).toHaveBeenCalledTimes(2);
      });
    }));

    it('should should be called "logBackwardJourneyId" when change detection is triggered', waitForAsync(() => {
      const logBackwardJourneyIdSpy = jest.spyOn(componentUnderTest, 'logBackwardJourneyId');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(logBackwardJourneyIdSpy).toHaveBeenCalledTimes(2);
      });
    }));
  });

  describe('with isRoundTrip = false', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookingComponent],
        providers: [{
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(getApiTokenParamMapWithIsRoundTripAsFalse())
            }
          }
        }]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookingComponent);
      componentUnderTest = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should return isRoundTrip from route path', () => {

      const result: boolean = componentUnderTest.logIsRoundTrip();

      expect(result).toBeFalsy();
    });

    it('should return an empty backwardJourneyId from route path', () => {

      const result: string = componentUnderTest.logBackwardJourneyId();

      expect(result).toBe(getApiTokenParamMapWithIsRoundTripAsFalse().backwardJourneyId);
    });
  });

});
