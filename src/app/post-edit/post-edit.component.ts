import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-post-edit',
  template: `
    <mat-card>test</mat-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
