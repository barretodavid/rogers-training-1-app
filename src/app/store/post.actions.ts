import { Action } from '@ngrx/store';
import { Post } from './models';

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
  constructor() {}
}

export type CreatePostAction = CreatePostStartAction | CreatePostSuccessAction | CreatePostErrorAction;

export enum GetPostActionType {
  Start = '[Post] Get Post Start',
  Success = '[Post] Get Post Success',
  Error = '[Post] Get Post Error',
}

export class GetPostStartAction implements Action {
  readonly type = GetPostActionType.Start;
  constructor(public payload: string) {}
}

export class GetPostSuccessAction implements Action {
  readonly type = GetPostActionType.Success;
  constructor(public payload: Post) {}
}

export class GetPostErrorAction implements Action {
  readonly type = GetPostActionType.Error;
  constructor() {}
}

export type GetPostAction = GetPostStartAction | GetPostSuccessAction | GetPostErrorAction;

export enum UpdatePostActionType {
  Start = '[Post] Update Post Start',
  Success = '[Post] Update Post Success',
  Error = '[Post] Update Post Error',
}

export class UpdatePostStartAction implements Action {
  readonly type = UpdatePostActionType.Start;
  constructor(public payload: Post) {}
}

export class UpdatePostSuccessAction implements Action {
  readonly type = UpdatePostActionType.Success;
  constructor(public payload: Post) {}
}

export class UpdatePostErrorAction implements Action {
  readonly type = UpdatePostActionType.Error;
  constructor() {}
}

export type UpdatePostAction = UpdatePostStartAction | UpdatePostSuccessAction | UpdatePostErrorAction;

export type PostAction = CreatePostAction | GetPostAction | UpdatePostAction;
