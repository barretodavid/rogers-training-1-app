import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-post-list',
  template: `
    <p>
      post-list works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
