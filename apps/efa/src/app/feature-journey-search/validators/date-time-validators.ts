import { FormControl, ValidationErrors, Validators } from '@angular/forms';

const HOURS_TO_MINUTES_MULTIPLIER = 60;

export class DateTimeValidators {

  static requiredIf(isRoundTrip: () => boolean): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      if (isRoundTrip()) {
        return Validators.required(control);
      }
      return null;
    };
  }

  static backwardDate(isRoundTrip: () => boolean, outwardDate: () => Date): (control: FormControl) => ValidationErrors | null {
    return function backwardDate(backwardDate: FormControl): ValidationErrors | null {
      if (!backwardDate || !backwardDate.value || !backwardDate.parent) {
        return null;
      }
      if (isRoundTrip() && DateTimeValidators.isDateSmaller(outwardDate(), backwardDate.value)) {
        return {
          backwardDate: {
            valid: false
          }
        };
      }
      return null;
    };
  }

  static backwardTime(
    isRoundTrip: () => boolean,
    backwardDate: () => Date,
    outwardDate: () => Date,
    outwardTime: () => Date
  ): (control: FormControl) => ValidationErrors | null {
    return function backwardTime(backwardTime: FormControl): ValidationErrors | null {
      if (!backwardTime || !backwardTime.value || !backwardTime.parent) {
        return null;
      }
      if (isRoundTrip() && DateTimeValidators.isDateEqual(outwardDate(), backwardDate())) {
        if (DateTimeValidators.isTimeNotValid(outwardTime(), backwardTime.value)) {
          return {
            backwardTime: {
              valid: false
            }
          };
        }
      }
      return null;
    };
  }

  private static isDateSmaller(outwardDate: Date, backwardDate: Date): boolean {
    if (!outwardDate) {
      return false;
    }
    const outwardDateWithoutTime: Date = DateTimeValidators.getDateWithoutTime(outwardDate);
    const backwardDateWithoutTime: Date = DateTimeValidators.getDateWithoutTime(backwardDate);

    return backwardDateWithoutTime.getTime() < outwardDateWithoutTime.getTime();
  }

  private static getDateWithoutTime(date: Date): Date {
    const days: number = date.getDate();
    const months: number = date.getMonth();
    const years: number = date.getFullYear();

    return new Date(years, months, days, 0, 0, 0, 0);
  }

  private static isDateEqual(outwardDate: Date, backwardDate: Date): boolean {
    if (!outwardDate || !backwardDate) {
      return false;
    }

    const outwardDateWithoutTime: Date = DateTimeValidators.getDateWithoutTime(outwardDate);
    const backwardDateWithoutTime: Date = DateTimeValidators.getDateWithoutTime(backwardDate);

    return backwardDateWithoutTime.getTime() === outwardDateWithoutTime.getTime();
  }

  private static isTimeNotValid(outwardTime: Date, backwardTime: Date): boolean {
    if (!outwardTime) {
      return false;
    }

    const outwardTimeInMinutes: number = DateTimeValidators.getMinutesOfDay(outwardTime);
    const backwardTimeInMinutes: number = DateTimeValidators.getMinutesOfDay(backwardTime);

    return backwardTimeInMinutes <= outwardTimeInMinutes;
  }

  private static getMinutesOfDay(date: Date): number {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    return hours * HOURS_TO_MINUTES_MULTIPLIER + minutes;
  }
}
