import { TravelPointValidators } from './travel-point-validators';
import { FormControl, ValidationErrors } from '@angular/forms';
import { getFurtwangenUniversityTravelPoint } from '../../shared/objectmothers/travel-point-object-mother';


const expectedValidationError: ValidationErrors = {
  pointFormat: {
    valid: false
  }
};

describe('TravelPointValidators', () => {
  it('should create an instance', () => {
    expect(new TravelPointValidators()).toBeTruthy();
  });

  it('should return null when form control is correct', () => {
    const testPointFormControl: FormControl = new FormControl(getFurtwangenUniversityTravelPoint());

    const result: ValidationErrors | null = TravelPointValidators.pointFormat(testPointFormControl);

    expect(result).toBeNull();
  });

  it('should return validation error when form control is incorrect', () => {
    const testPointFormControl: FormControl = new FormControl('Testinput');

    const result: ValidationErrors | null = TravelPointValidators.pointFormat(testPointFormControl);

    expect(result).toEqual(expectedValidationError);
  });

  it('should return validation error when form control is null', () => {
    const testPointFormControl: FormControl = new FormControl(null);

    const result: ValidationErrors | null = TravelPointValidators.pointFormat(testPointFormControl);

    expect(result).toEqual(expectedValidationError);
  });

  it('should return validation error when form control is undefined', () => {
    const testPointFormControl: FormControl = new FormControl(undefined);

    const result: ValidationErrors | null = TravelPointValidators.pointFormat(testPointFormControl);

    expect(result).toEqual(expectedValidationError);
  });

  it('should throw an error when an undefined value is passed', () => {
    const testPointFormControl: FormControl = undefined;

    expect(() => TravelPointValidators.pointFormat(testPointFormControl)).toThrow(TypeError);
  });

  it('should throw an error when a null value is passed', () => {
    const testPointFormControl: FormControl = null;

    expect(() => TravelPointValidators.pointFormat(testPointFormControl)).toThrow(TypeError);
  });


});
