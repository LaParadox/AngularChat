import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { User } from "../../auth/model/user.model";
import * as actions from '../actions/chat.ations';
import { ChatRoom } from "../model/chat-room.model";

export interface RoomState extends EntityState<ChatRoom>{
  user: User;
  currentRoomId: undefined,
  allChatsLoaded: boolean,
}

export const roomAdapter = createEntityAdapter<ChatRoom>(
);

export const initialRoomState = roomAdapter.getInitialState({
  currentRoomId: undefined,
  allChatsLoaded: false
});

export const roomReducer = createReducer(
  initialRoomState,

  on(actions.allChatsLoaded,
    (state, action) =>
    roomAdapter.addMany(
      action.rooms,{
        ...state,
        allChatsLoaded: true
      }
    )
    ),

    on(actions.roomWasCreated,
      (state, action) =>
        {
          return {
            ...state,
            user: action.user,
            currentRoomId: action.user.roomId
          }
      })
);

export const {
  selectAll,
  selectIds,
  selectEntities,
} = roomAdapter.getSelectors();
