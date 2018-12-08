import { Action } from '@ngrx/store';
import { Post } from '../../posts.models';

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

export type UpdatePostAction =
  | UpdatePostStartAction
  | UpdatePostSuccessAction
  | UpdatePostErrorAction;
