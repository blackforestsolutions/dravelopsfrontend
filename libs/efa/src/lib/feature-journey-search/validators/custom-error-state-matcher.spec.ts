import { CustomErrorStateMatcher } from './custom-error-state-matcher';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

describe('CustomErrorStateMatcher', () => {

  const classUnderTest: ErrorStateMatcher = new CustomErrorStateMatcher();

  it('should create an instance', () => {
    expect(new CustomErrorStateMatcher()).toBeTruthy();
  });

  it('should return false when form is not submitted', () => {
    const control: FormControl = new FormControl();
    const form: FormGroupDirective = new FormGroupDirective(null, null);

    const result: boolean = classUnderTest.isErrorState(control, form);

    expect(result).toBeFalsy();
  });

  it('should return false when form is undefined', () => {
    const control: FormControl = new FormControl();

    const result: boolean = classUnderTest.isErrorState(control, undefined);

    expect(result).toBeFalsy();
  });

  it('should return false when formControl is null', () => {
    const form: FormGroupDirective = new FormGroupDirective(null, null);

    const result: boolean = classUnderTest.isErrorState(null, form);

    expect(result).toBeFalsy();
  });

});
