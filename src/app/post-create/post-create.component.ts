import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rg-post-create',
  template: `
    <form [formGroup]="blogForm" (ngSubmit)="onSubmit()">
      <mat-card>
        <mat-card-title>Create Blog Post</mat-card-title>
        <mat-card-content class="flex flex-column">
          <rg-input formControlName="title" label="Title"></rg-input>
          <rg-textarea formControlName="content" label="Content"></rg-textarea>
        </mat-card-content>
        <mat-card-actions>
          <button type="submit" mat-raised-button color="primary" [disabled]="!blogForm.valid">Save</button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreateComponent implements OnInit {
  blogForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.blogForm.value);
  }

}
