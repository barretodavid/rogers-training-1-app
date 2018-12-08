import { Post } from '../posts.models';
import { GetPostActionType } from './actions/get-post.actions';
import { GetAllPostsActionType } from './actions/get-all-posts.actions';
import { CreatePostActionType } from './actions/create-post.actions';
import { UpdatePostActionType } from './actions/update-post.actions';
import { DeletePostActionType } from './actions/delete-post.actions';
import { PostAction } from './actions/post.action';

export function postsReducer(posts: Post[] = [], action: PostAction): Post[] {
  switch (action.type) {
    case GetPostActionType.Success:
    case CreatePostActionType.Success:
      return [...posts, action.payload];
    case UpdatePostActionType.Success:
      return posts.map(post =>
        post.uuid === action.payload.uuid ? action.payload : post,
      );
    case GetAllPostsActionType.Success:
      return action.payload;
    case DeletePostActionType.Success:
      return posts.filter(post => {
        if (post.uuid !== action.payload) {
          return post;
        }
      });
    default:
      return posts;
  }
}
