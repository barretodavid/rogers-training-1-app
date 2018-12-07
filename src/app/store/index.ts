import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import { postsReducer } from './posts.reducer';
import { State } from './models';
import { flagsReducer } from './flags.reducer';

export const reducers: ActionReducerMap<State> = {
  posts: postsReducer,
  flags: flagsReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
