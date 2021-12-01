import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ChatMessage } from "../model/chat.model";
import * as actions from '../actions/chat.ations';

export interface ChatState extends EntityState<ChatMessage>{
  currentRoomId: undefined,
  allMessagesLoaded: boolean
}

export const chatAdapter = createEntityAdapter<ChatMessage>(
);

export const initialState = chatAdapter.getInitialState({
  currentRoomId: undefined,
  allMessagesLoaded: false,

});

export const chatReducer = createReducer(
  initialState,

  on(actions.allMessagesSynchronized,
    (state, action) =>
     chatAdapter.addMany(
      action.messages, {
         ...state,
         allMessagesLoaded: true
       }
      ))
);

export const {
  selectIds,
  selectAll
} = chatAdapter.getSelectors();
