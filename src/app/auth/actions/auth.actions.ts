import {createAction, props} from '@ngrx/store';
import {User} from '../model/user.model';

export const login = createAction(
    "[Login] User Login",
    props<{ user: User }>()
);

export const logedIn = createAction(
  "[Login] User LoggedIn",
   props<{user: User}>()
);

export const logout = createAction(
  "[Logout] User LoggedOut"
);

export const signUp = createAction(
  "[SignUp] User SignUp",
  props<{user:User}>()
);

export const userSignedUp = createAction(
  "[SignUp] User SignedUp"
);

export const loginWithGoogle = createAction(
  "[Login] User Login With Google"
);
