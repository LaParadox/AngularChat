import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '../reducers';

export const selectAuthState =
    createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    selectAuthState,
    auth =>  !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn,
);

export const userRoomId = createSelector(
  selectAuthState,
  state => state.currentRoomId
);

export const currentUser = createSelector(
  selectAuthState,
  user => user.user
);
