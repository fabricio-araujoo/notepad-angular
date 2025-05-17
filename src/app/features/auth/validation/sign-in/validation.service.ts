import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  customValidator(requiredSubstring: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (typeof value === 'string' && value.includes(requiredSubstring)) {
        return null;
      }

      return { custom: true };
    };
  }

  static errorMessages: Record<string, string | ((params: unknown) => string)> =
    {
      required: 'Este campo é obrigatório.',
      email: 'Formato de e-mail inválido.',
    };

  static getErrorMessage(errorKey: string, errorValue?: unknown): string {
    const message = this.errorMessages[errorKey];

    return typeof message === 'function'
      ? message(errorValue)
      : message || 'Erro desconhecido.';
  }
}
