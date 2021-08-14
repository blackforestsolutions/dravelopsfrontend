import { FormControl, ValidationErrors } from '@angular/forms';

export class TravelPointValidators {

  static pointFormat(control: FormControl): ValidationErrors | null {
    if (!control.value || !control.value.point || !control) {
      return {
        pointFormat: {
          valid: false
        }
      };
    }
    return null;
  }
}
