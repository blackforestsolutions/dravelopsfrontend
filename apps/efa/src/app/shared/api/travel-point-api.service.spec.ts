import { TestBed } from '@angular/core/testing';

import { TravelPointApiService } from './travel-point-api.service';
import { GetAddressesGQL } from '../model/generated';
import { getFurtwangenUniversityTravelPoint } from '../objectmothers/travel-point-object-mother';
import { of } from 'rxjs';
import { expect } from '@jest/globals';

describe('TravelPointApiService', () => {
  let getAddressesGQLSpy: jasmine.Spy;
  let classUnderTest: TravelPointApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const getAddressesGQL: GetAddressesGQL = TestBed.inject(GetAddressesGQL);
    classUnderTest = TestBed.inject(TravelPointApiService);

    getAddressesGQLSpy = spyOn(getAddressesGQL, 'watch').and.returnValue(
      {
        valueChanges: of({
          data: {
            getAutocompleteAddressesBy: [getFurtwangenUniversityTravelPoint(), getFurtwangenUniversityTravelPoint()]
          }
        })
      }
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should GET a list of TravelPoints', (done) => {
    const testText = 'Am Großhausberg 8';

    classUnderTest.getAddressesBy(testText).subscribe((result) => {
      expect(result.length).toBe(2);
      expect(result[0]).toEqual(getFurtwangenUniversityTravelPoint());
      expect(result[1]).toEqual(getFurtwangenUniversityTravelPoint());
      done();
    });
  });

  it('should be called "getAddressesGQL" correctly and with right params', () => {
    const testText = 'Am Großhausberg 8';

    classUnderTest.getAddressesBy(testText).subscribe(() => {
      expect(getAddressesGQLSpy).toHaveBeenCalledTimes(1);
      expect(getAddressesGQLSpy).toHaveBeenCalledWith(testText);
    });
  });
});
