import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rg-post-create',
  template: `
  <form [formGroup]="blogForm" (ngSubmit)="onSubmit()">
    <mat-card>

        <mat-card-title>Create Blog Post</mat-card-title>
        <mat-card-content class="flex flex-column">

          <mat-form-field appearance="standard" class="w-100">
            <mat-label>Title</mat-label>
            <input matInput placeholder="Title" formControlName="title">
            <mat-error *ngIf="title.hasError('required')">
              This field is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="standard" class="w-100">
            <mat-label>Content</mat-label>
            <textarea matInput placeholder="Content" formControlName="content"></textarea>
            <mat-error *ngIf="content.hasError('required')">
              This field is required
            </mat-error>
          </mat-form-field>

        </mat-card-content>

        <mat-card-actions>
          <button type="submit" mat-raised-button color="primary" [disabled]="!blogForm.valid">Save</button>
        </mat-card-actions>

    </mat-card>
    </form>
  `,
  styles: [],
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

  get title() {
    return this.blogForm.get('title');
  }

  get content() {
    return this.blogForm.get('content');
  }

  onSubmit() {
    console.log(this.blogForm.value);
  }

}
