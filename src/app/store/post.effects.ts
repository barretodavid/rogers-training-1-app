import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  CreatePostAction,
  CreatePostActionType,
  CreatePostStartAction,
  CreatePostErrorAction,
  GetPostAction,
  GetPostActionType,
  GetPostStartAction,
  GetPostSuccessAction,
  GetPostErrorAction,
  UpdatePostAction,
  UpdatePostActionType,
  UpdatePostStartAction,
  UpdatePostSuccessAction,
  UpdatePostErrorAction
} from './post.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CreatePostSuccessAction } from './post.actions';
import { PostService } from './post.service';


@Injectable({ providedIn: 'root' })
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) {}

  @Effect()
  create$: Observable<CreatePostAction> =
    this.actions$.pipe(
      ofType(CreatePostActionType.Start),
      mergeMap((action: CreatePostStartAction) =>
        this.postService.create(action.payload).pipe(
          map(post => new CreatePostSuccessAction(post)),
          catchError(() => of(new CreatePostErrorAction())),
        )
      ));

  @Effect()
  update$: Observable<UpdatePostAction> =
    this.actions$.pipe(
      ofType(UpdatePostActionType.Start),
      mergeMap((action: UpdatePostStartAction) =>
        this.postService.update(action.payload).pipe(
          map(post => new UpdatePostSuccessAction(post)),
          catchError(() => of(new UpdatePostErrorAction())),
        )
      ));

  @Effect()
  get$: Observable<GetPostAction> =
    this.actions$.pipe(
      ofType(GetPostActionType.Start),
      mergeMap((action: GetPostStartAction) =>
        this.postService.get(action.payload).pipe(
          map(post => new GetPostSuccessAction(post)),
          catchError(() => of(new GetPostErrorAction())),
        )
      ));
}
