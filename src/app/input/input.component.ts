import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseInputClass } from '../base-input/base-input.class';

@Component({
  selector: 'rg-input',
  template: `
    <mat-form-field appearance="standard" class="w-100">
      <mat-label>{{ label }}</mat-label>
      <input matInput [formControl]="controlDir.control">
      <mat-error *ngIf="controlDir.control.hasError('required')">
        This field is required
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends BaseInputClass {

  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
  }

}
