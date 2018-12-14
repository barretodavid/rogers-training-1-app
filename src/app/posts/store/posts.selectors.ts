import { Injectable } from '@angular/core';
import {
  Store,
  createFeatureSelector,
  select,
  createSelector,
} from '@ngrx/store';
import { Observable, zip, of } from 'rxjs';
import { filter, mergeMap, map } from 'rxjs/operators';

import { State } from '../../store/models';
import { Post } from '../posts.models';
import { RouterSelector } from '../../store/router.selector';

const selectPosts = createFeatureSelector<State, Post[]>('posts');

const selectPostByUUID = createSelector(
  selectPosts,
  (posts, props) => posts.find(post => post.uuid === props.uuid),
);

const selectIsPostAvailable = createSelector(
  selectPostByUUID,
  post => !!post,
);

@Injectable({ providedIn: 'root' })
export class PostSelector {
  postIsNotInStore(): Observable<string> {
    return this.routerSelector.uuid$.pipe(
      mergeMap(uuid =>
        zip(of(uuid), this.store.pipe(select(selectIsPostAvailable, { uuid }))),
      ),
      filter(([uuid, isPostAvailable]) => !isPostAvailable),
      map(([uuid, isPostAvailable]) => uuid),
    );
  }

  getFetchAllPosts(): Observable<boolean> {
    return this.store.pipe(
      select(selectPosts),
      map(posts => posts.length === 0),
      filter(isPostsEmpty => isPostsEmpty),
    );
  }

  getPosts(): Observable<Post[]> {
    return this.store.pipe(select(selectPosts));
  }

  isPostAvailable(uuid: string): Observable<boolean> {
    return this.store.pipe(select(selectIsPostAvailable, { uuid }));
  }

  getPostByUUID(uuid: string): Observable<Post> {
    return this.store.pipe(
      select(selectPostByUUID, { uuid }),
      filter(Boolean),
    );
  }

  constructor(
    private store: Store<State>,
    private routerSelector: RouterSelector,
  ) {}
}
