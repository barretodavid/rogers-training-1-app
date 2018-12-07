import { Params } from '@angular/router';

export type Post = Readonly<{
  uuid: string;
  title: string;
  content: string;
}>;

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
  posts: Post[];
  flags: Flags;
  router: Router;
}
