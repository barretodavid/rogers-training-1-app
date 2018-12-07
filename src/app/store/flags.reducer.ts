import { Flags } from './models';
import { CreatePostActionType, PostAction, UpdatePostActionType } from './post.actions';
import { clearFlagsType, ClearFlagsAction } from './flags.actions';

const initialState: Flags = {
  isLoading: false,
  isError: false,
  message: '',
};

type Action = PostAction | ClearFlagsAction;

export function flagsReducer(flags = initialState, action: Action): Flags {
  switch (action.type) {
    case CreatePostActionType.Start:
      return { ...flags, isLoading: true };
    case CreatePostActionType.Success:
      return {
        isLoading: false,
        isError: false,
        message: 'Post saved successfully!'
      };
    case CreatePostActionType.Error:
      return {
        isLoading: false,
        isError: true,
        message: 'Oops! Failed to save post'
      };
    case UpdatePostActionType.Success:
      return {
        isLoading: false,
        isError: false,
        message: 'Post updated successfully!'
      };
    case UpdatePostActionType.Error:
      return {
        isLoading: false,
        isError: true,
        message: 'Oops! Failed to update post'
      };
    case clearFlagsType: {
      return initialState;
    }
    default:
      return flags;
  }
}
