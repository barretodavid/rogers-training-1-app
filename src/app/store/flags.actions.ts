import { Action } from '@ngrx/store';

export const clearFlagsType = '[Flags] Clear Flags';

export class ClearFlagsAction implements Action {
  readonly type = clearFlagsType;
}
