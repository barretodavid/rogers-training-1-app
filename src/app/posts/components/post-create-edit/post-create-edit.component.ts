import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { v4 as uuidV4 } from 'uuid';
import { mergeMap, } from 'rxjs/operators';

import { State } from 'src/app/store/models';
import { RouterSelector } from 'src/app/store/router.selector';

import { CreatePostStartAction } from '../../store/actions/create-post.actions';
import { UpdatePostStartAction } from '../../store/actions/update-post.actions';
import { GetPostStartAction } from '../../store/actions/get-post.actions';

import { Post } from '../../posts.models';
import { PostSelector } from '../../store/posts.selectors';
import { DeletePostStartAction } from '../../store/actions/delete-post.actions';
import { Router } from '@angular/router';


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
    private router: Router,
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

  onSave(): void {
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

  onDelete(uuid: string): void {
    this.store.dispatch(new DeletePostStartAction(uuid));
    this.router.navigate(['/']);
  }
}
