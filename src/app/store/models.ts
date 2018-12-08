import { Params } from '@angular/router';
import { Post } from '../posts/posts.models';

export type Flags = Readonly<{
  isLoading: boolean;
  isError: boolean;
  message: string;
}>;

export type RouterState = Readonly<{
  url: string;
  params: Params;
  queryParams: Params;
}>;

export type Router = Readonly<{
  state: RouterState;
  navigationId: number;
}>;

export interface State {
  posts?: Post[];
  flags: Flags;
  router: Router;
}
