import { PolygonApiService } from './polygon-api.service';
import {
  GetOperatingAreaGQL,
  GetOperatingAreaQuery,
  GetOperatingAreaQueryVariables,
  PolygonFragment
} from '../model/generated';
import { of } from 'rxjs';
import { getHvvOperatingArea } from '../objectmothers/polygon-object-mother';
import { expect } from '@jest/globals';
import { QueryRef } from 'apollo-angular';

describe('PolygonApiService', () => {
  let getOperatingAreaGQLSpy: jest.SpyInstance;

  let classUnderTest: PolygonApiService;

  beforeEach(() => {
    const getOperatingAreaGQL: GetOperatingAreaGQL = {
      watch: jest.fn()
    } as unknown as GetOperatingAreaGQL;

    classUnderTest = new PolygonApiService(getOperatingAreaGQL);

    getOperatingAreaGQLSpy = jest.spyOn(getOperatingAreaGQL, 'watch').mockReturnValue(
      {
        valueChanges: of({
          data: {
            getOperatingArea: getHvvOperatingArea()
          }
        })
      } as QueryRef<GetOperatingAreaQuery, GetOperatingAreaQueryVariables>
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should GET a Polygon when "getOperatingArea" is called', (done) => {
    classUnderTest.getOperatingArea().subscribe((result: PolygonFragment) => {
      expect(result).toEqual(getHvvOperatingArea());
      done();
    });
  });

  it('should be called "getOperatingAreaGQL" correctly and with right params', (done) => {
    classUnderTest.getOperatingArea().subscribe(() => {
      expect(getOperatingAreaGQLSpy).toHaveBeenCalledTimes(1);
      expect(getOperatingAreaGQLSpy).toHaveBeenCalledWith();
      done();
    });
  });
});
