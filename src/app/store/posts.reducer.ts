import { Post } from './models';
import { CreatePostActionType, PostAction, GetPostActionType } from './post.actions';

export function postsReducer(posts = [], action: PostAction): Post[] {
  switch (action.type) {
    case GetPostActionType.Success:
    case CreatePostActionType.Success:
      return [...posts, action.payload];
    default:
      return posts;
  }
}
