import { TestBed } from '@angular/core/testing';

import { JourneyListService } from './journey-list.service';
import { MockProvider } from 'ng-mocks';
import { JourneyApiService } from '../../shared/api/journey-api.service';
import { EMPTY, Observable, of } from 'rxjs';
import { getFurtwangenToWaldkirchJourney } from '../../shared/objectmothers/journey-object-mother';
import { GetAllJourneysQuery, JourneyFragment } from '../../shared/model/generated';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { convertToParamMap, ParamMap } from '@angular/router';
import {
  getApiTokenParamMapWithIsRoundTripAsTrue,
  getBackwardJourneyApiToken,
  getOutwardJourneyApiToken
} from '../../shared/objectmothers/api-token-object-mother';
import { ApolloQueryResult } from '@apollo/client';
import { expect } from '@jest/globals';
import { TestScheduler } from 'rxjs/testing';
import { ApiToken } from '../../shared/model/api-token';
import { SortJourneyPipe } from '../pipes/sort-journey-pipe/sort-journey.pipe';
import { FilterEqualJourneysPipe } from '../pipes/filter-equal-journey-pipe/filter-equal-journeys.pipe';

describe('JourneyListService', () => {
  let journeyApiService: JourneyApiService;
  let getJourneysBySpy: jasmine.Spy;
  let getAllJourneysBySpy: jasmine.Spy;

  let classUnderTest: JourneyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JourneyListService,
        MockProvider(LOCALE_ID, 'de'),
        FilterEqualJourneysPipe,
        SortJourneyPipe
      ]
    });

    registerLocaleData(localeDe);
  });

  beforeEach(() => {
    journeyApiService = TestBed.inject(JourneyApiService);
    classUnderTest = TestBed.inject(JourneyListService);

    getJourneysBySpy = spyOn(journeyApiService, 'getJourneysBy').and.returnValue(of({
      data: {
        getJourneysBy: getFurtwangenToWaldkirchJourney()
      }
    }));

    getAllJourneysBySpy = spyOn(journeyApiService, 'getAllJourneysBy').and.returnValue(of({
      data: {
        getJourneysBy: [getFurtwangenToWaldkirchJourney()]
      },
      loading: false
    } as ApolloQueryResult<GetAllJourneysQuery>));
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('"getJourneys" with apiToken and loading returns two journeys (first object, second one array)', () => {
    const testApiToken = getOutwardJourneyApiToken();
    const testSetLoading: (loading: boolean) => void = loading => loading;

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getJourneys(testApiToken, testSetLoading);

    const scheduler: TestScheduler = new TestScheduler(((actual, expected) => expect(actual).toEqual(expected)));
    scheduler.run(({ expectObservable }) => {
      const expectedMarble = '(ab|)';
      const expectedJourneys = {
        a: getFurtwangenToWaldkirchJourney(),
        b: [getFurtwangenToWaldkirchJourney()]
      };

      expectObservable(result$).toBe(expectedMarble, expectedJourneys);
    });
  });

  it('"getJourneys" with apiToken and loading is setting loading flag correctly', (done) => {
    const testApiToken = getOutwardJourneyApiToken();
    let loadingFlag: boolean;
    const testSetLoading: (loading: boolean) => void = loading => loadingFlag = loading;

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getJourneys(testApiToken, testSetLoading);

    result$.subscribe(
      {
        complete: () => {
          expect(loadingFlag).toBeFalsy();
          done();
        }
      }
    );
  });

  it('"getJourneys" with apiToken and loading is executed correctly and pass params to services correctly', (done) => {
    const testApiToken: ApiToken = getOutwardJourneyApiToken();
    const testSetLoading: (loading: boolean) => void = loading => loading;

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getJourneys(testApiToken, testSetLoading);

    result$.subscribe({
      complete: () => {
        expect(getJourneysBySpy).toHaveBeenCalledTimes(1);
        expect(getJourneysBySpy).toHaveBeenCalledWith(testApiToken);
        expect(getAllJourneysBySpy).toHaveBeenCalledTimes(1);
        expect(getAllJourneysBySpy).toHaveBeenCalledWith(testApiToken);
        done();
      }
    });
  });

  it('"getJourneys" with apiToken and loading returns an empty array when no results are found in backend', () => {
    getJourneysBySpy.and.returnValue(EMPTY);
    getAllJourneysBySpy.and.returnValue(of({
      data: {
        getJourneysBy: []
      },
      loading: false
    } as ApolloQueryResult<GetAllJourneysQuery>));
    const testApiToken: ApiToken = getOutwardJourneyApiToken();
    const testSetLoading: (loading: boolean) => void = loading => loading;

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getJourneys(testApiToken, testSetLoading);

    const scheduler: TestScheduler = new TestScheduler(((actual, expected) => expect(actual).toEqual(expected)));
    scheduler.run(({ expectObservable }) => {
      const expectedMarble = '(a|)';
      const expectedJourneys = {
        a: []
      };
      expectObservable(result$).toBe(expectedMarble, expectedJourneys);
    });
  });

  it('"getOutwardJourneysBy" apiToken and loading calls "getJourneys" correctly and with correct params', (done) => {
    const testParamMap: ParamMap = convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue());
    const testSetLoading: (loading: boolean) => void = loading => loading;
    const getJourneysSpy = spyOn(classUnderTest, 'getJourneys').and.returnValue(of(getFurtwangenToWaldkirchJourney()));

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getOutwardJourneysBy(testParamMap, testSetLoading);

    result$.subscribe({
      complete: () => {
        expect(getJourneysSpy).toHaveBeenCalledTimes(1);
        expect(getJourneysSpy).toHaveBeenCalledWith(getOutwardJourneyApiToken(), testSetLoading);
        done();
      }
    });
  });

  it('"getBackwardJourneysBy" apiToken and loading call "getJourneys" correctly and with correct params', (done) => {
    const testParamMap: ParamMap = convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue());
    const testSetLoading: (loading: boolean) => void = loading => loading;
    const getJourneysSpy = spyOn(classUnderTest, 'getJourneys').and.returnValue(of(getFurtwangenToWaldkirchJourney()));

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getBackwardJourneysBy(testParamMap, testSetLoading);

    result$.subscribe({
      complete: () => {
        expect(getJourneysSpy).toHaveBeenCalledTimes(1);
        expect(getJourneysSpy).toHaveBeenCalledWith(getBackwardJourneyApiToken(), testSetLoading);
        done();
      }
    });
  });

  it('"getEarlierJourneysBy" apiToken and loading calls "getJourneys" correctly and with correct params', (done) => {
    const testParamMap: ParamMap = convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue());
    const testSetLoading: (loading: boolean) => void = loading => loading;
    const testCurrentJourneys: JourneyFragment[] = [getFurtwangenToWaldkirchJourney()];
    const getJourneysSpy = spyOn(classUnderTest, 'getJourneys').and.returnValue(of(getFurtwangenToWaldkirchJourney()));

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getEarlierJourneysBy(
      testParamMap,
      testSetLoading,
      testCurrentJourneys
    );

    result$.subscribe({
      complete: () => {
        expect(getJourneysSpy).toHaveBeenCalledTimes(1);
        expect(getJourneysSpy).toHaveBeenCalledWith({
          ...getOutwardJourneyApiToken(),
          outwardJourney: {
            dateTime: new Date('2020-09-30T13:08:13+02:00'),
            isArrivalDateTime: true
          }
        }, testSetLoading);
        done();
      }
    });
  });

  it('"getLaterJourneysBy" apiToken and loading calls "getJourneys" correctly and with correct params', (done) => {
    const testParamMap: ParamMap = convertToParamMap(getApiTokenParamMapWithIsRoundTripAsTrue());
    const testSetLoading: (loading: boolean) => void = loading => loading;
    const testCurrentJourneys: JourneyFragment[] = [getFurtwangenToWaldkirchJourney()];
    const getJourneysSpy = spyOn(classUnderTest, 'getJourneys').and.returnValue(of(getFurtwangenToWaldkirchJourney()));

    const result$: Observable<JourneyFragment | JourneyFragment[]> = classUnderTest.getLaterJourneysBy(
      testParamMap,
      testSetLoading,
      testCurrentJourneys
    );

    result$.subscribe({
      complete: () => {
        expect(getJourneysSpy).toHaveBeenCalledTimes(1);
        expect(getJourneysSpy).toHaveBeenCalledWith({
          ...getOutwardJourneyApiToken(),
          outwardJourney: {
            dateTime: new Date('2020-09-30T14:34:56+02:00'),
            isArrivalDateTime: false
          }
        }, testSetLoading);
        done();
      }
    });
  });

});
