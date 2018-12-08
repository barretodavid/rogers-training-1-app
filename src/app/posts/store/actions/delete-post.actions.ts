import { Action } from '@ngrx/store';
import { Post } from '../../posts.models';

export enum DeletePostActionType {
  Start = '[Post] Delete Post Start',
  Success = '[Post] Delete Post Success',
  Error = '[Post] Delete Post Error',
}

export class DeletePostStartAction implements Action {
  readonly type = DeletePostActionType.Start;
  constructor(public payload: string) {}
}

export class DeletePostSuccessAction implements Action {
  readonly type = DeletePostActionType.Success;
  constructor(public payload: string) {}
}

export class DeletePostErrorAction implements Action {
  readonly type = DeletePostActionType.Error;
  constructor() {}
}

export type DeletePostAction = DeletePostStartAction | DeletePostSuccessAction | DeletePostErrorAction;
