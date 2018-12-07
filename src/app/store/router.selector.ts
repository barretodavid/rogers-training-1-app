import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector, Store, select } from '@ngrx/store';

import { filter } from 'rxjs/operators';

import { State, Router } from './models';


const selectRouter = createFeatureSelector<State, Router>('router');

const selectUrl = createSelector(
  selectRouter,
  router => router.state.url,
);

const selectParams = createSelector(
  selectRouter,
  router => router.state.params,
);

const selectUUID = createSelector(
  selectParams,
  params => params.uuid as string,
);

const selectIsEdit = createSelector(
  selectUUID,
  uuid => !!uuid,
);

const selectQueryParams = createSelector(
  selectRouter,
  router => router.state.queryParams,
);

@Injectable({ providedIn: 'root' })
export class RouterSelector {

  url$ = this.store.pipe(
    select(selectUrl),
    filter(url => !!url),
  );

  params$ = this.store.pipe(
    select(selectParams),
    filter(params => !!params),
  );

  uuid$ = this.store.pipe(
    select(selectUUID),
    filter(uuid => !!uuid),
  );

  isEdit$ = this.store.pipe(
    select(selectIsEdit),
  );

  queryParams$ = this.store.pipe(
    select(selectQueryParams),
    filter(queryParams => !!queryParams),
  );

  constructor(private store: Store<State>) {}
}
