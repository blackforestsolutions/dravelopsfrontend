import { DateTimeValidators } from './date-time-validators';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

const DEFAULT_TEST_BACKWARD_DATE = () => new Date();
const DEFAULT_TEST_OUTWARD_DATE = () => new Date();
const DEFAULT_TEST_BACKWARD_TIME = () => new Date();
const DEFAULT_TEST_OUTWARD_TIME = () => new Date();
const DEFAULT_TEST_IS_ROUND_TRIP = () => true;
const DEFAULT_TEST_HOURS = 10;
const DEFAULT_TEST_MINUTES = 11;


describe('DateTimeValidators', () => {

  it('should create an instance', () => {
    expect(new DateTimeValidators()).toBeTruthy();
  });

  describe('requiredIf', () => {

    it('should should return null when isRoundTrip is true and parent control is null', () => {
      const isRoundTrip: () => boolean = () => true;
      const control: FormControl = new FormControl('');
      control.setParent(null);

      const result: ValidationErrors | null = DateTimeValidators.requiredIf(isRoundTrip)(control);

      expect(result).toBeNull();
    });

    it('should return requiredValidators when isRoundTrip is true and control is correct', () => {
      const isRoundTrip: () => boolean = () => true;
      const control: FormControl = getCorrectFormControlWith('');

      const result: ValidationErrors | null = DateTimeValidators.requiredIf(isRoundTrip)(control);

      expect(result).toEqual(Validators.required(control));
    });

    it('should return null when isRoundTrip is false and control is correct', () => {
      const isRoundTrip: () => boolean = () => false;
      const control: FormControl = getCorrectFormControlWith('');

      const result: ValidationErrors | null = DateTimeValidators.requiredIf(isRoundTrip)(control);

      expect(result).toBeNull();
    });
  });

  describe('backwardDate', () => {

    it('should return null when isRoundTrip is correct, outwardDate is correct and backwardDateControl is null', () => {
      const backwardDate: FormControl = null;

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_OUTWARD_DATE)
      (backwardDate);

      expect(result).toBeNull();
    });

    it('should return null when isRoundTrip is correct, outwardDate is correct and backwardDateControlValue is null', () => {
      const backwardDate: FormControl = new FormControl(null);

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_OUTWARD_DATE)
      (backwardDate);

      expect(result).toBeNull();
    });

    it('should return null when isRoundTrip is correct, outwardDate is correct and backwardDate has no parent FormGroup', () => {
      const backwardDate: FormControl = new FormControl(new Date());
      backwardDate.setParent(null);

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_OUTWARD_DATE
      )(backwardDate);

      expect(result).toBeNull();
    });

    it('should return null when isRoundTrip returns null, outwardDate is correct and backwardDate is correct', () => {
      const isRoundTrip: () => boolean = () => null;
      const backwardDate: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(isRoundTrip, DEFAULT_TEST_OUTWARD_DATE)(backwardDate);

      expect(result).toBeNull();
    });

    it('should return null when isRoundTrip is correct, outwardDate returns null and backwardDate is correct', () => {
      const outwardDate: () => Date = () => null;
      const backwardDate: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(DEFAULT_TEST_IS_ROUND_TRIP, outwardDate)(backwardDate);

      expect(result).toBeNull();
    });

    it('should return null when isRoundTrip is false, outwardDate is correct and backwardDate is correct', () => {
      const isRoundTrip: () => boolean = () => false;
      const backwardDate: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(isRoundTrip, DEFAULT_TEST_OUTWARD_DATE)(backwardDate);

      expect(result).toBeNull();
    });

    it('should return null when isRoundTrip is correct and outwardDate is equal backwardDate', () => {
      const testDate = '2020-04-22';
      const outwardDate: () => Date = () => new Date(testDate);
      const backwardDate: FormControl = getCorrectFormControlWith(new Date(testDate));

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(DEFAULT_TEST_IS_ROUND_TRIP, outwardDate)(backwardDate);

      expect(result).toBeNull();
    });

    it('should return validationError when isRoundTrip is correct and backwardDate is smaller than outwardDate', () => {
      const outwardDate: () => Date = () => new Date('2020-04-22');
      const backwardDate: FormControl = getCorrectFormControlWith(new Date('2020-04-21'));

      const result: ValidationErrors | null = DateTimeValidators.backwardDate(DEFAULT_TEST_IS_ROUND_TRIP, outwardDate)(backwardDate);

      expect(result).toEqual({ backwardDate: { valid: false } });
    });
  });

  describe('backwardTime', () => {

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate is correct, outwardDate is correct, outwardTime is correct and backwardTimeControl is null', () => {
      const backwardTime: FormControl = null;

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_BACKWARD_DATE,
        DEFAULT_TEST_OUTWARD_DATE,
        DEFAULT_TEST_OUTWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate is correct, outwardDate is correct, outwardTime is correct and backwardTimeControlValue is null', () => {
      const backwardTime: FormControl = new FormControl(null);

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_BACKWARD_DATE,
        DEFAULT_TEST_OUTWARD_DATE,
        DEFAULT_TEST_OUTWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate is correct, outwardDate is correct, outwardTime is correct and backwardTimeControl has no parent FormGroup', () => {
      const backwardTime: FormControl = new FormControl(new Date());
      backwardTime.setParent(null);

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_BACKWARD_DATE,
        DEFAULT_TEST_OUTWARD_DATE,
        DEFAULT_TEST_OUTWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip returns null, backwardDate is correct, outwardDate is correct, outwardTime is correct and backwardTime is correct', () => {
      const isRoundTrip: () => boolean = () => null;
      const backwardTime: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        isRoundTrip,
        DEFAULT_TEST_BACKWARD_DATE,
        DEFAULT_TEST_OUTWARD_DATE,
        DEFAULT_TEST_OUTWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate returns null, outwardDate is correct, outwardTime is correct and backwardTime is correct', () => {
      const backwardDate: () => Date = () => null;
      const backwardTime: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        backwardDate,
        DEFAULT_TEST_OUTWARD_DATE,
        DEFAULT_TEST_OUTWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate is correct, outwardDate returns null, outwardTime is correct and backwardTime is correct', () => {
      const outwardDate: () => Date = () => null;
      const backwardTime: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_BACKWARD_DATE,
        outwardDate,
        DEFAULT_TEST_OUTWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate is correct, outwardDate is correct, outwardTime returns null and backwardTime is correct', () => {
      const outwardTime: () => Date = () => null;
      const backwardTime: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        DEFAULT_TEST_BACKWARD_DATE,
        DEFAULT_TEST_OUTWARD_DATE,
        outwardTime
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, outwardTime is correct, backwardTime is correct, backwardDate and outwardDate are different, ', () => {
      const backwardDate: () => Date = () => new Date('2020-04-22');
      const outwardDate: () => Date = () => new Date('2020-04-21');
      const backwardTime: FormControl = getCorrectFormControlWith(new Date());

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        backwardDate,
        outwardDate,
        DEFAULT_TEST_BACKWARD_TIME
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return null when isRoundTrip is correct, backwardDate and outwardDate are equal, backwardTime greater than outwardTime', () => {
      const testDate = '2020-04-22';
      const backwardDate: () => Date = () => new Date(testDate);
      const outwardDate: () => Date = () => new Date(testDate);
      const outwardTime: () => Date = () => createTimeWith(10, 10);
      const backwardTime: FormControl = getCorrectFormControlWith(createTimeWith(10, 11));

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        backwardDate,
        outwardDate,
        outwardTime
      )(backwardTime);

      expect(result).toBeNull();
    });

    // long test description is necessary for test understanding
    // eslint-disable-next-line max-len
    it('should return validationError when isRoundTrip is correct, backwardDate and outwardDate are equal, backwardTime and outwardTime are equal', () => {
      const testDate = '2020-04-22';
      const backwardDate: () => Date = () => new Date(testDate);
      const outwardDate: () => Date = () => new Date(testDate);
      const outwardTime: () => Date = () => createTimeWith(DEFAULT_TEST_HOURS, DEFAULT_TEST_MINUTES);
      const backwardTime: FormControl = getCorrectFormControlWith(createTimeWith(DEFAULT_TEST_HOURS, DEFAULT_TEST_MINUTES));

      const result: ValidationErrors | null = DateTimeValidators.backwardTime(
        DEFAULT_TEST_IS_ROUND_TRIP,
        backwardDate,
        outwardDate,
        outwardTime
      )(backwardTime);

      expect(result).toEqual({ backwardTime: { valid: false } });
    });

  });
});

const getCorrectFormControlWith = (value: unknown): FormControl => {
  const formControl: FormControl = new FormControl(value);
  const formGroup = new FormGroup({ testField: formControl });
  formControl.setParent(formGroup);
  return formControl;
};

const createTimeWith = (hours: number, minutes: number): Date => {
  const date: Date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};
