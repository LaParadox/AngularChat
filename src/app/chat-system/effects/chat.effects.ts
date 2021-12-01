import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { ChatService } from "../services/chat.service";
import { ChatActions } from "../actions/action-types";
import {
  allChatsLoaded,
  allMessagesSynchronized,
} from "../actions/chat.ations";
import { EMPTY, of } from "rxjs";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";
import { userRoomId } from "../../auth/selectors/auth.selectors";
import { MessageService } from "../services/message.service";
import { User } from "../../auth/model/user.model";

@Injectable()
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.messageWasSent),
        mergeMap((action) =>
          of(action).pipe(
            withLatestFrom(this.store.pipe(select(userRoomId))),
            map(([action, latest]) => {
              this.messageService.sendMessage(action.message, action.room);
            })
          )
        )
      ),
    { dispatch: false }
  );

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadMessages),
      mergeMap(() => {
        return this.messageService.getChatMessages().pipe(
          map((messages) => allMessagesSynchronized({ messages })),
          catchError(() => {
            return EMPTY;
          })
        );
      })
    )
  );

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatActions.loadAllChats),
      mergeMap(() =>
        this.chatService.getChatRoom().pipe(
          map((rooms) => allChatsLoaded({ rooms })),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  createRoom$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatActions.roomWasCreated),
        mergeMap((room) =>
        this.chatService.createRoom(room.room)
      )
      ),
    { dispatch: false }
  );
}
