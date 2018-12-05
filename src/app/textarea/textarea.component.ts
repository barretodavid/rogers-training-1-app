import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseInputClass } from '../base-input/base-input.class';

@Component({
  selector: 'rg-textarea',
  template: `
    <mat-form-field appearance="standard" class="w-100">
      <mat-label>{{ label }}</mat-label>
      <textarea matInput [formControl]="controlDir.control"></textarea>
      <mat-error *ngIf="controlDir.control.hasError('required')">
        This field is required
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends BaseInputClass {
  constructor(@Self() public controlDir: NgControl) {
    super(controlDir);
  }
}
