import { Action } from '@ngrx/store';
import { Post } from '../../posts.models';

export enum GetAllPostsActionType {
  Start = '[Post] Get All Posts Start',
  Success = '[Post] Get All Posts Success',
  Error = '[Post] Get All Posts Error',
}

export class GetAllPostsStartAction implements Action {
  readonly type = GetAllPostsActionType.Start;
}

export class GetAllPostsSuccessAction implements Action {
  readonly type = GetAllPostsActionType.Success;
  constructor(public payload: Post[]) {}
}

export class GetAllPostsErrorAction implements Action {
  readonly type = GetAllPostsActionType.Error;
}

export type GetAllPostsAction =
  | GetAllPostsStartAction
  | GetAllPostsSuccessAction
  | GetAllPostsErrorAction;
