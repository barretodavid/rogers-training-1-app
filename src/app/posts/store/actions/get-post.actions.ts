import { Action } from '@ngrx/store';
import { Post } from '../../posts.models';

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
