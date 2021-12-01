import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../actions/action-types";
import { concatMap, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { ChatActions } from "../../chat-system/actions/action-types";
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthEffects {

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        concatMap(() => this.userService.logoutUser())
      ),
    { dispatch: false }
  );

  loginWithGoogle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginWithGoogle),
        concatMap(() => this.auth.signinWithGoogle())
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUp),
        concatMap((action) =>
          this.auth.signUpUser(
            action.user.email,
            action.user.password,
            action.user.displayName
          )
        ),
        tap(() => {
          AuthActions.userSignedUp();
        })
      ),
    { dispatch: false }
  );

  updateUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.joiningRoom),
      mergeMap((action) =>
           this.userService.updateUserData(action.user.uid, action.room.id)
       )
      ),
    {dispatch: false}
  );

  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap((action) => {
          return this.userService.getUserData(action.user.uid).then((
            user: User
          ) => AuthActions.logedIn({user}))
    })
  )
);

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.joiningRoom),
      mergeMap((action) => {
        sessionStorage.setItem('user', JSON.stringify(action.user));
            return this.userService.getUserData(action.user.uid).then((
              user: User
            ) =>  ChatActions.userJoinedRoom({user }))
      })
    )
  );

  joinRoom$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ChatActions.tryToJoinRoom),
    mergeMap(() =>{
      return this.userService.getUserAsync().then((user: User) =>
       ChatActions.userJoinedRoom({user})
      );
    })
  )
);

  constructor(private actions$: Actions,
              private auth: AuthService,
              private userService: UserService) {}
}
