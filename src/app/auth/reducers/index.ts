import { createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../actions/action-types";
import { ChatActions } from "../../chat-system/actions/action-types";

export interface AuthState {
  user: User;
  currentRoomId: undefined;
}

export const initialAuthState: AuthState = {
  user: undefined,
  currentRoomId: undefined
};

export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
    try {
      return {
        ...state,
        user: action.user
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }),

  on(AuthActions.logout, (state, action) => {
    try {
      return {
        user: undefined
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }),

  on(AuthActions.loginWithGoogle, (state, action) => {
    try {
      return {
        ...state,
       user: action.type
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }),

  on(AuthActions.signUp, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),

  on(ChatActions.joiningRoom, (state,action) => {
     return {
       ...state,
       user: action.user,
       currentRoomId: action.room.id
     }
  }),

  on(ChatActions.tryToJoinRoom, (state, action) => {
    return {
      ...state,
      user: action.user,
      currentRoomId: action.user.roomId
    }
  }),

  on(ChatActions.userJoinedRoom, (state, action) =>
  {
    return {
      ...state,
      user: action.user,
     currentRoomId: action.user.roomId
    }
  })

);

