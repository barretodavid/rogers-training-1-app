import { GetPostAction } from './get-post.actions';
import { GetAllPostsAction } from './get-all-posts.actions';
import { CreatePostAction } from './create-post.actions';
import { UpdatePostAction } from './update-post.actions';
import { DeletePostAction } from './delete-post.actions';

export type PostAction =
  | GetPostAction
  | GetAllPostsAction
  | CreatePostAction
  | UpdatePostAction
  | DeletePostAction;
