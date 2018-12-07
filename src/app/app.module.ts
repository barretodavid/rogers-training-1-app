import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostSummaryComponent } from './components/post-summary/post-summary.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PostCreateEditComponent } from './components/post-create-edit/post-create-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';

import { reducers, metaReducers } from './store';
import { PostEffects } from './store/post.effects';

import { environment } from '../environments/environment';
import { RouterSerializer } from './store/router.serializer';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([PostEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [
    AppComponent,
    PostSummaryComponent,
    NavigationComponent,
    PostCreateEditComponent,
    PostListComponent,
    InputComponent,
    TextareaComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
