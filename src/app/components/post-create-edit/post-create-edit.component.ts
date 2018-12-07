import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { v4 as uuidV4 } from 'uuid';

import { State, Post } from 'src/app/store/models';
import { CreatePostStartAction, UpdatePostStartAction, GetPostStartAction } from 'src/app/store/post.actions';
import { RouterSelector } from 'src/app/store/router.selector';
import { PostSelector } from 'src/app/store/post.selectors';
import { mergeMap, } from 'rxjs/operators';


@Component({
  selector: 'rg-post-create',
  templateUrl: './post-create-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreateEditComponent implements OnInit {
  blogForm: FormGroup;
  postUUID: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    public routerSelector: RouterSelector,
    private postSelector: PostSelector,
  ) {}

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.postSelector.fetchPost$
      .subscribe(uuid => {
        this.store.dispatch(new GetPostStartAction(uuid));
      });

    const post$ = this.routerSelector.uuid$.pipe(
      mergeMap(uuid => this.postSelector.getPostByUUID(uuid))
    );

    post$.subscribe(post => {
      this.blogForm.patchValue({
        title: post.title,
        content: post.content,
      });
      this.postUUID = post.uuid;
    });
  }

  onSubmit() {
    const post: Post = {
      uuid: this.postUUID || uuidV4(),
      ...this.blogForm.value,
    };

    if (this.postUUID) {
      this.store.dispatch(new UpdatePostStartAction(post));
    } else {
      this.store.dispatch(new CreatePostStartAction(post));
      this.postUUID = post.uuid;
    }
  }
}
