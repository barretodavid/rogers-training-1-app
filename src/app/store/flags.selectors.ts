import { Injectable } from '@angular/core';
import {
  createFeatureSelector,
  createSelector,
  Store,
  select,
} from '@ngrx/store';
import { State, Flags } from './models';
import { filter } from 'rxjs/operators';

const selectFlags = createFeatureSelector<State, Flags>('flags');

const selectIsLoading = createSelector(
  selectFlags,
  flags => flags.isLoading,
);

const selectIsError = createSelector(
  selectFlags,
  flags => flags.isError,
);

const selectMessage = createSelector(
  selectFlags,
  flags => flags.message,
);

const selectErrorMessage = createSelector(
  selectIsError,
  selectMessage,
  (isError, message) => (isError ? message : ''),
);

const selectSuccessMessage = createSelector(
  selectIsError,
  selectMessage,
  (isError, message) => (isError ? '' : message),
);

@Injectable({ providedIn: 'root' })
export class FlagsSelector {
  isLoadingFinished$ = this.store.pipe(
    select(selectIsLoading),
    filter(Boolean),
  );

  errorMessage$ = this.store.pipe(
    select(selectErrorMessage),
    filter(Boolean),
  );

  successMessage$ = this.store.pipe(
    select(selectSuccessMessage),
    filter(Boolean),
  );

  constructor(private store: Store<State>) {}
}
