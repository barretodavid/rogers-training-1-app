import { postsReducer } from './posts.reducer';
import { Post } from '../posts.models';
import { CreatePostSuccessAction } from './actions/create-post.actions';
import { GetPostSuccessAction } from './actions/get-post.actions';
import { UpdatePostSuccessAction } from './actions/update-post.actions';

describe('postsReducer', () => {
  let currentState: Post[];

  describe('when no posts had been created', () => {
    let newPost: Post;

    beforeEach(() => {
      currentState = [];
      newPost = {
        uuid: 'abc',
        title: 'test title',
        content: 'test content',
      };
    });

    describe('and when a new post is created succesfully', () => {
      it('should add the post at the end of the array', () => {
        const action = new CreatePostSuccessAction(newPost);
        const newState = postsReducer(currentState, action);
        expect(newState).toEqual([newPost]);
      });
    });

    describe('and when a post is fetched successfully', () => {
      it('should add the post at the end of the array', () => {
        const action = new GetPostSuccessAction(newPost);
        const newState = postsReducer(currentState, action);
        expect(newState).toEqual([newPost]);
      });
    });
  });

  describe('when there are two posts already in the store', () => {
    beforeEach(() => {
      currentState = [
        { uuid: 'ua', title: 'ta', content: 'ca' },
        { uuid: 'ub', title: 'tb', content: 'cb' },
      ];
    });

    describe('when the first post is updated', () => {
      let updatePost: Post;

      beforeEach(() => {
        updatePost = { uuid: 'ua', title: 'ta2', content: 'ca2' };
      });

      it('should return an array of posts of the same length', () => {
        const action = new UpdatePostSuccessAction(updatePost);
        const newState = postsReducer(currentState, action);
        expect(newState.length).toBe(currentState.length);
      });

      it('shoud return an array of posts with the first element updated', () => {
        const action = new UpdatePostSuccessAction(updatePost);
        const newState = postsReducer(currentState, action);
        expect(newState).toEqual([
          { uuid: 'ua', title: 'ta2', content: 'ca2' },
          { uuid: 'ub', title: 'tb', content: 'cb' },
        ]);
      });
    });

    describe('when an update on a post with an invalid uuid is attempted', () => {
      it('should return the same array', () => {
        const updatePost: Post = { uuid: 'x', title: 'ta2', content: 'ca2' };
        const action = new UpdatePostSuccessAction(updatePost);
        const newState = postsReducer(currentState, action);
        expect(newState).toEqual(currentState);
      });
    });
  });
});
