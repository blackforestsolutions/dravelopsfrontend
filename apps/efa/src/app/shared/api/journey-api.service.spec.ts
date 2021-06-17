import { TestBed } from '@angular/core/testing';

import { JourneyApiService } from './journey-api.service';
import { GetAllJourneysGQL, GetJourneysGQL } from '@dravelopsfrontend/generated-content';
import { getFurtwangenToWaldkirchJourney } from '../objectmothers/journey-object-mother';
import { ApiToken } from '../model/api-token';
import {
  getAllJourneysQueryVariablesWithNoEmptyField,
  getOutwardJourneyApiToken
} from '../objectmothers/api-token-object-mother';
import { MockProvider } from 'ng-mocks';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { of } from 'rxjs';
import { expect } from '@jest/globals';

describe('JourneyApiService', () => {
  let getAllJourneysGQLSpy: jasmine.Spy;
  let getJourneysGQLSpy: jasmine.Spy;
  let classUnderTest: JourneyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(LOCALE_ID, 'de')
      ]
    });
    registerLocaleData(localeDe);
    const getAllJourneysGQL: GetAllJourneysGQL = TestBed.inject(GetAllJourneysGQL);
    const getJourneysGQL: GetJourneysGQL = TestBed.inject(GetJourneysGQL);
    classUnderTest = TestBed.inject(JourneyApiService);

    getAllJourneysGQLSpy = spyOn(getAllJourneysGQL, 'watch').and.returnValue(
      {
        valueChanges: of({
          data: {
            getJourneysBy: [getFurtwangenToWaldkirchJourney(), getFurtwangenToWaldkirchJourney()]
          }
        })
      }
    );

    getJourneysGQLSpy = spyOn(getJourneysGQL, 'subscribe').and.returnValue(of({
        data: {
          getJourneysBy: getFurtwangenToWaldkirchJourney()
        }
      })
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('"getAllJourneysBy" apiToken should GET a list of journeys', (done) => {
    const testApiToken: ApiToken = getOutwardJourneyApiToken();

    classUnderTest.getAllJourneysBy(testApiToken).subscribe((result) => {
      expect(result.data.getJourneysBy.length).toBe(2);
      expect(result.data.getJourneysBy[0]).toEqual(getFurtwangenToWaldkirchJourney());
      expect(result.data.getJourneysBy[1]).toEqual(getFurtwangenToWaldkirchJourney());
      expect(result.loading).toBeFalsy();
      done();
    });
  });

  it('"getAllJourneysBy" should be executed correctly with right params', (done) => {
    const testApiToken: ApiToken = getOutwardJourneyApiToken();

    classUnderTest.getAllJourneysBy(testApiToken).subscribe(() => {
      expect(getAllJourneysGQLSpy).toHaveBeenCalledTimes(1);
      expect(getAllJourneysGQLSpy).toHaveBeenCalledWith(getAllJourneysQueryVariablesWithNoEmptyField());
      done();
    });
  });

  it('"getAllJourneysBy" apiToken should GET a list of empty journeys when no journey is found by backend', (done) => {
    const testApiToken: ApiToken = getOutwardJourneyApiToken();
    getAllJourneysGQLSpy.and.returnValue(
      {
        valueChanges: of({
          data: {
            getJourneysBy: []
          }
        })
      }
    );

    classUnderTest.getAllJourneysBy(testApiToken).subscribe((result) => {
      expect(result.data.getJourneysBy.length).toBe(0);
      expect(result.loading).toBeFalsy();
      done();
    });
  });

  it('"getJourneysBy" apiToken should emit one journey', (done) => {
    const testApiToken: ApiToken = getOutwardJourneyApiToken();

    classUnderTest.getJourneysBy(testApiToken).subscribe((result) => {
      expect(result.data.getJourneysBy).toEqual(getFurtwangenToWaldkirchJourney());
      done();
    });
  });

  it('"getJourneysBy" apiToken should be executed correctly with right params', (done) => {
    const testApiToken: ApiToken = getOutwardJourneyApiToken();

    classUnderTest.getJourneysBy(testApiToken).subscribe(() => {
      expect(getJourneysGQLSpy).toHaveBeenCalledTimes(1);
      expect(getJourneysGQLSpy).toHaveBeenCalledWith(getAllJourneysQueryVariablesWithNoEmptyField());
      done();
    });
  });

});
