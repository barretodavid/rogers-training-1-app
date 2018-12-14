import { Action } from '@ngrx/store';
import { Post } from '../../posts.models';

export enum CreatePostActionType {
  Start = '[Post] Create Post Start',
  Success = '[Post] Create Post Success',
  Error = '[Post] Create Post Error',
}

export class CreatePostStartAction implements Action {
  readonly type = CreatePostActionType.Start;
  constructor(public payload: Post) {}
}

export class CreatePostSuccessAction implements Action {
  readonly type = CreatePostActionType.Success;
  constructor(public payload: Post) {}
}

export class CreatePostErrorAction implements Action {
  readonly type = CreatePostActionType.Error;
}

export type CreatePostAction =
  | CreatePostStartAction
  | CreatePostSuccessAction
  | CreatePostErrorAction;
