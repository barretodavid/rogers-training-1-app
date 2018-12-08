import { CreatePostActionType } from 'src/app/posts/store/actions/create-post.actions';
import { UpdatePostActionType } from 'src/app/posts/store/actions/update-post.actions';
import { DeletePostActionType } from 'src/app/posts/store/actions/delete-post.actions';
import { PostAction } from 'src/app/posts/store/actions/post.action';

import { Flags } from './models';
import { clearFlagsType, ClearFlagsAction } from './flags.actions';

const successFlags: Flags = {
  isLoading: false,
  isError: false,
  message: '',
};

const errorFlags: Flags = {
  isLoading: false,
  isError: true,
  message: '',
};

type Action = PostAction | ClearFlagsAction;

export function flagsReducer(flags = successFlags, action: Action): Flags {
  switch (action.type) {
    case CreatePostActionType.Start:
      return { ...flags, isLoading: true };
    case CreatePostActionType.Success:
      return {
        ...successFlags,
        message: 'Post saved successfully!',
      };
    case CreatePostActionType.Error:
      return {
        ...errorFlags,
        message: 'Oops! Failed to save post',
      };
    case UpdatePostActionType.Success:
      return {
        ...successFlags,
        message: 'Post updated successfully!',
      };
    case UpdatePostActionType.Error:
      return {
        ...errorFlags,
        message: 'Oops! Failed to update post',
      };
    case DeletePostActionType.Success:
      return {
        ...successFlags,
        message: 'Post deleted successfully!',
      };
    case DeletePostActionType.Error:
      return {
        ...errorFlags,
        message: 'Oops! Failed to delete post',
      };
    case clearFlagsType: {
      return successFlags;
    }
    default:
      return flags;
  }
}
