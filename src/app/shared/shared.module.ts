import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputComponent,
    TextareaComponent,
  ],
  exports: [
    InputComponent,
    TextareaComponent,
  ],
})
export class SharedModule {}
