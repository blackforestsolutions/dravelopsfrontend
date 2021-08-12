import { TestBed } from '@angular/core/testing';

import { PolygonApiService } from './polygon-api.service';
import { GetOperatingAreaGQL, PolygonFragment } from '../model/generated';
import { of } from 'rxjs';
import { getHvvOperatingArea } from '../objectmothers/polygon-object-mother';
import { expect } from '@jest/globals';

describe('PolygonApiService', () => {
  let getOperatingAreaGQLSpy: jasmine.Spy;
  let classUnderTest: PolygonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    classUnderTest = TestBed.inject(PolygonApiService);
    const getOperatingAreaGQL = TestBed.inject(GetOperatingAreaGQL);

    getOperatingAreaGQLSpy = spyOn(getOperatingAreaGQL, 'watch').and.returnValue(
      {
        valueChanges: of({
          data: {
            getOperatingArea: getHvvOperatingArea()
          }
        })
      }
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
