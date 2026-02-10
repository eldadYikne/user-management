import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static notAdmin(control: AbstractControl): ValidationErrors | null {
    if (control.value?.toLowerCase() === 'admin') {
      return { notAdmin: true };
    }
    return null;
  }

  static ageRange(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== null && value !== '' && (value < min || value > max)) {
        return { ageRange: { min, max } };
      }
      return null;
    };
  }
}
