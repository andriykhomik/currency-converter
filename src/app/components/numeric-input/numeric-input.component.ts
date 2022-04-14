import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  FormControl,
  ValidationErrors,
  ControlValueAccessor,
} from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumericInputComponent),
      multi: true,
    },
  ],
})
export class NumericInputComponent implements ControlValueAccessor, Validator {
  @Input() public placeHolderText = '';
  @Input() public isRequired = false;

  public inputValue!: string;

  public onInputChange(event: any): void {
    const newValue = event.target.value;
    if (!this.isValidInput(newValue)) {
      event.target.value = this.inputValue;
    } else if (newValue !== this.inputValue) {
      this.inputValue = newValue;
      this.propagateChange(this.inputValue);
    }
  }

  public writeValue(value: string): void {
    if (this.isValidInput(value) && this.inputValue !== value) {
      this.inputValue = (
        Math.round((+value + Number.EPSILON) * 1000) / 1000
      ).toString();
    }
  }

  public validate(formControl: FormControl): ValidationErrors {
    return this.isRequired && !this.inputValue
      ? { required: true }
      : { required: null };
  }

  public registerOnChange(callbackFunction: (newValue: string) => void): void {
    this.propagateChange = callbackFunction;
  }

  public registerOnTouched(callbackFunction: () => void): void {}

  private propagateChange = (newValue: string) => {};

  private isValidInput(value: string): boolean {
    return !isNaN(Number(value));
  }
}
