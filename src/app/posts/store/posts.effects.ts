import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  GetPostAction,
  GetPostActionType,
  GetPostStartAction,
  GetPostSuccessAction,
  GetPostErrorAction,
} from './actions/get-post.actions';
import {
  GetAllPostsAction,
  GetAllPostsActionType,
  GetAllPostsStartAction,
  GetAllPostsSuccessAction,
  GetAllPostsErrorAction,
} from './actions/get-all-posts.actions';
import {
  CreatePostAction,
  CreatePostActionType,
  CreatePostStartAction,
  CreatePostErrorAction,
  CreatePostSuccessAction,
} from './actions/create-post.actions';
import {
  UpdatePostAction,
  UpdatePostActionType,
  UpdatePostStartAction,
  UpdatePostSuccessAction,
  UpdatePostErrorAction,
} from './actions/update-post.actions';

import { PostsService } from '../posts.service';
import {
  DeletePostAction,
  DeletePostActionType,
  DeletePostStartAction,
  DeletePostSuccessAction,
  DeletePostErrorAction,
} from './actions/delete-post.actions';

@Injectable({ providedIn: 'root' })
export class PostEffects {
  constructor(private actions$: Actions, private postService: PostsService) {}

  @Effect()
  get$: Observable<GetPostAction> = this.actions$.pipe(
    ofType(GetPostActionType.Start),
    mergeMap((action: GetPostStartAction) =>
      this.postService.get(action.payload).pipe(
        map(post => new GetPostSuccessAction(post)),
        catchError(() => of(new GetPostErrorAction())),
      ),
    ),
  );

  @Effect()
  getAll$: Observable<GetAllPostsAction> = this.actions$.pipe(
    ofType(GetAllPostsActionType.Start),
    mergeMap((action: GetAllPostsStartAction) =>
      this.postService.getAll().pipe(
        map(posts => new GetAllPostsSuccessAction(posts)),
        catchError(() => of(new GetAllPostsErrorAction())),
      ),
    ),
  );

  @Effect()
  create$: Observable<CreatePostAction> = this.actions$.pipe(
    ofType(CreatePostActionType.Start),
    mergeMap((action: CreatePostStartAction) =>
      this.postService.create(action.payload).pipe(
        map(post => new CreatePostSuccessAction(post)),
        catchError(() => of(new CreatePostErrorAction())),
      ),
    ),
  );

  @Effect()
  update$: Observable<UpdatePostAction> = this.actions$.pipe(
    ofType(UpdatePostActionType.Start),
    mergeMap((action: UpdatePostStartAction) =>
      this.postService.update(action.payload).pipe(
        map(post => new UpdatePostSuccessAction(post)),
        catchError(() => of(new UpdatePostErrorAction())),
      ),
    ),
  );

  @Effect()
  delete$: Observable<DeletePostAction> = this.actions$.pipe(
    ofType(DeletePostActionType.Start),
    mergeMap((action: DeletePostStartAction) =>
      this.postService.delete(action.payload).pipe(
        map(uuid => new DeletePostSuccessAction(uuid)),
        catchError(() => of(new DeletePostErrorAction())),
      ),
    ),
  );
}
