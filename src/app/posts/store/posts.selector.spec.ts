import { PostSelector } from './posts.selectors';
import { State } from '../../store/models';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

describe('PostSelector', () => {
  let state: Partial<State>;
  let store: Observable<State>;

  describe('fetchPost$', () => {
    describe('when there are a couple of posts in the store', () => {
      beforeEach(() => {
        state = {
          posts: [
            { uuid: 'u1', title: 't1', content: 'c1' },
            { uuid: 'u2', title: 't2', content: 'c2' },
          ],
        };
        store = cold('-a', { a: state });
      });

      describe('when the router emits the uuid of a post available in the store', () => {
        it('it should not emit the uuid in the stream', () => {
          const routerSelector = {
            uuid$: cold('-b', { b: 'u1' }),
          };
          const postSelector = new PostSelector(
            store as any,
            routerSelector as any,
          );
          const expected = cold('--');
          expect(postSelector.postIsNotInStore()).toBeObservable(expected);
        });
      });

      describe('when a post with that uuid does not exist in the store', () => {
        it('should emit the uuid in the stream', () => {
          const routerSelector = {
            uuid$: cold('-b', { b: 'u3' }),
          };
          const postSelector = new PostSelector(
            store as any,
            routerSelector as any,
          );
          const expected = cold('--c', { c: 'u3' });
          expect(postSelector.postIsNotInStore()).toBeObservable(expected);
        });
      });
    });
  });

  describe('fetchAllPosts$', () => {
    describe('when there is at least one post in the store', () => {
      beforeEach(() => {
        state = {
          posts: [{ uuid: 'u1', title: 't1', content: 'c1' }],
        };
        store = cold('-a', { a: state });
      });

      it('should not emit anything on the stream', () => {
        const routerSelector = {};
        const postSelector = new PostSelector(
          store as any,
          routerSelector as any,
        );
        const expected = cold('-');
        expect(postSelector.getFetchAllPosts()).toBeObservable(expected);
      });
    });

    describe('when there is no post stored', () => {
      beforeEach(() => {
        state = { posts: [] };
        store = cold('-a', { a: state });
      });

      it('should emit true on the stream', () => {
        const routerSelector = {};
        const postSelector = new PostSelector(
          store as any,
          routerSelector as any,
        );
        const expected = cold('-b', { b: true });
        expect(postSelector.getFetchAllPosts()).toBeObservable(expected);
      });
    });
  });
});
