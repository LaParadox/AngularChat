import { DocumentChangeAction } from "@angular/fire/compat/firestore";
import { createAction, props } from "@ngrx/store";
import { User } from "../../auth/model/user.model";
import { ChatRoom } from "../model/chat-room.model";
import { ChatMessage } from "../model/chat.model";

export const loadMessages = createAction(
  "[Chat] Load All Messages"
);

export const allMessagesSynchronized = createAction(
  "[Chat] All Messages Synchronized",
  props<{messages: ChatMessage[]}>()
);

export const messageWasSent = createAction(
  "[Chat] Message was sent",
  props<{message: string, room: User}>()
);

export const loadAllChats = createAction(
  "[Chat] Load All Chats"
);

export const allChatsLoaded = createAction(
  "[Chat] All Chats Loaded",
  props<{rooms: ChatRoom[]}>()
);

export const roomWasCreated = createAction(
  "[Chat] Room Was Created",
  props<{user: User, room: string}>()
);

export const joiningRoom = createAction(
  "[Chat] User Joins Room",
  props<{user: User, room: ChatRoom}>()
);

export const userJoinedRoom = createAction(
  "[Chat] User Joined Room",
  props<{user: User}>()
);

export const tryToJoinRoom = createAction(
  "[Chat] Trying to join room",
  props<{user: User}>()
);
