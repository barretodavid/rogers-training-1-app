import { Component, OnInit, OnDestroy } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import { ClearFlagsAction } from './store/flags.actions';
import { Store } from '@ngrx/store';
import { State } from './store/models';
import { FlagsSelector } from './store/flags.selectors';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'rg-root',
  template: `
    <rg-navigation></rg-navigation>
  `,
})
export class AppComponent implements OnInit, OnDestroy {

  subs = new Subscription();

  constructor(
    private store: Store<State>,
    private flags: FlagsSelector,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const dismissedSuccess$ = this.flags.successMessage$.pipe(
      mergeMap(message =>
        this.snackBar
          .open(message, '', { duration: 2000 })
          .afterDismissed()
      )
    );

    const dismissedError$ = this.flags.errorMessage$.pipe(
      mergeMap(message =>
        this.snackBar
          .open(message, 'Dismiss')
          .afterDismissed()
        )
    );

    const dismissed$ = merge(dismissedSuccess$, dismissedError$);

    this.subs.add(
      dismissed$.subscribe(() => this.store.dispatch(new ClearFlagsAction()))
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
