import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreateEditComponent } from './components/post-create-edit/post-create-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';

export enum PostUrl {
  Create = 'create-post',
  Edit = 'edit-post'
}

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: PostUrl.Create, component: PostCreateEditComponent },
  { path: `${PostUrl.Edit}/:uuid`, component: PostCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
