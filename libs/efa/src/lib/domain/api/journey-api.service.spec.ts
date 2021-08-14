import { JourneyApiService } from './journey-api.service';
import {
  GetAllJourneysGQL,
  GetAllJourneysQuery,
  GetAllJourneysQueryVariables,
  GetJourneysGQL
} from '../model/generated';
import { getFurtwangenToWaldkirchJourney } from '../objectmothers/journey-object-mother';
import { ApiToken } from '../model/api-token';
import {
  getAllJourneysQueryVariablesWithNoEmptyField,
  getOutwardJourneyApiToken
} from '../objectmothers/api-token-object-mother';
import { of } from 'rxjs';
import { expect } from '@jest/globals';
import { QueryRef } from 'apollo-angular';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

describe('JourneyApiService', () => {
  let getAllJourneysGQLSpy: jest.SpyInstance;
  let getJourneysGQLSpy: jest.SpyInstance;

  let classUnderTest: JourneyApiService;

  beforeEach(() => registerLocaleData(localeDe));

  beforeEach(() => {
    const getAllJourneysGQL: GetAllJourneysGQL = { watch: jest.fn() } as unknown as GetAllJourneysGQL;
    const getJourneysGQL: GetJourneysGQL = { subscribe: jest.fn() } as unknown as GetJourneysGQL;

    classUnderTest = new JourneyApiService(getAllJourneysGQL, getJourneysGQL, 'de');

    getAllJourneysGQLSpy = jest.spyOn(getAllJourneysGQL, 'watch').mockReturnValue(
      {
        valueChanges: of({
          data: {
            getJourneysBy: [getFurtwangenToWaldkirchJourney(), getFurtwangenToWaldkirchJourney()]
          }
        })
      } as QueryRef<GetAllJourneysQuery, GetAllJourneysQueryVariables>
    );

    getJourneysGQLSpy = jest.spyOn(getJourneysGQL, 'subscribe').mockReturnValue(of({
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
    getAllJourneysGQLSpy.mockReturnValue(
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
