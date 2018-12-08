import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule, MatButtonModule } from '@angular/material';

import { PostsRoutingModule } from './posts-routing.module';
import { PostCreateEditComponent } from './components/post-create-edit/post-create-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostSummaryComponent } from './components/post-summary/post-summary.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './store/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/posts.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature('posts', postsReducer),
    EffectsModule.forFeature([PostEffects]),
    PostsRoutingModule,
    SharedModule,
  ],
  declarations: [
    PostCreateEditComponent,
    PostListComponent,
    PostSummaryComponent,
  ],
  exports: [],
})
export class PostsModule {}
