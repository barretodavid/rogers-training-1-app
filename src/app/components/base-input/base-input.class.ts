import { Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export abstract class BaseInputClass implements ControlValueAccessor {
  onChange: (value: string) => void;
  onTouched: () => void;

  @Input() label: string;

  constructor(public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  writeValue(_: any): void {}

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
