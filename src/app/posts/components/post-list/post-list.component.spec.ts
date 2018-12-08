import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { PostListComponent } from './post-list.component';
import { of, empty } from 'rxjs';
import { PostSelector } from '../../store/posts.selectors';
import { Store } from '@ngrx/store';
import { GetAllPostsStartAction } from '../../store/actions/get-all-posts.actions';
import { Post } from '../../posts.models';

function configureTestBed(postSelectorStub): Promise<any> {
  const storeStub = {
    dispatch: jest.fn(),
  };

  return TestBed.configureTestingModule({
    imports: [
      NoopAnimationsModule,
      CommonModule,
      MatCardModule,
      RouterModule.forRoot([]),
    ],
    providers: [
      { provide: APP_BASE_HREF, useValue: '/' },
      { provide: PostSelector, useValue: postSelectorStub },
      { provide: Store, useValue: storeStub },
    ],
    declarations: [PostListComponent],
  }).compileComponents();
}

describe('PostListComponent', () => {
  let postSelectorStub;

  describe('when there are no posts in the store', () => {
    beforeEach(() => {
      postSelectorStub = {
        fetchAllPosts$: of(null),
        posts$: of([]),
      };
    });

    test('should render an empty body', async () => {
      await configureTestBed(postSelectorStub);
      const fixture = TestBed.createComponent(PostListComponent);
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });

    test('should dispatch an action to get all posts', async () => {
      await configureTestBed(postSelectorStub);
      const fixture = TestBed.createComponent(PostListComponent);
      const storeStub = fixture.debugElement.injector.get(Store);
      fixture.detectChanges();
      expect(storeStub.dispatch).toHaveBeenCalledWith(
        new GetAllPostsStartAction(),
      );
    });
  });

  describe('when there is at least on blog post in the store', () => {
    beforeEach(() => {
      const post: Post = {
        uuid: '123',
        title: 'my title',
        content: 'my content',
      };

      postSelectorStub = {
        fetchAllPosts$: empty(),
        posts$: of([post]),
      };
    });

    test('it should render the post in the body', async () => {
      await configureTestBed(postSelectorStub);
      const fixture = TestBed.createComponent(PostListComponent);
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });

    test('it should not dispatch an action to load all post from server', async () => {
      await configureTestBed(postSelectorStub);
      const fixture = TestBed.createComponent(PostListComponent);
      const storeStub = fixture.debugElement.injector.get(Store);
      fixture.detectChanges();
      expect(storeStub.dispatch).not.toHaveBeenCalled();
    });
  });
});
