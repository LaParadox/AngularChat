import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ChatMessage } from "../model/chat.model";
import * as actions from "../actions/chat.ations";
import { ChatRoom } from "../model/chat-room.model";
import { roomMessagesSelector } from "../selectors/messages.selector";
import { currentUser } from "../../auth/selectors/auth.selectors";
import { User } from "../../auth/model/user.model";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {

  listOfMessages$: Observable<ChatMessage[]>;
  newMessage: string;

  onChangeTheme: boolean = true;

  constructor(
    public authService: AuthService,
    private store: Store<ChatRoom>
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.getUser();
    this.listOfMessages$ = this.store.pipe(select(roomMessagesSelector));
    this.store.pipe(select(currentUser)).subscribe((user) =>
    this.store.dispatch(actions.tryToJoinRoom({user}))
    ).unsubscribe();
  }

  send(message: string, room: User): void {
    this.newMessage = message;

    if (message === "" || message === null) {
      message = "";
    } else {
      this.store.dispatch(actions.messageWasSent({ message, room }));
    }
  }

  changeTheme(): void{
   this.onChangeTheme = !this.onChangeTheme;
  }
}
