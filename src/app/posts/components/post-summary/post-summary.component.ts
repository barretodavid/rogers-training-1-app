import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-post-summary',
  host: {
    class: 'f1'
  },
  template: `
    <article>
      <h2>My blog post title</h2>
      <p>The body of my blog post</p>
      <p>Nov 16, 2018</p>
    </article>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
