import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ChatRoom } from "../model/chat-room.model";
import * as fromActions from "../reducers/index2";
import { selectAllRooms } from "../selectors/room.selectors";
import * as actions from "../actions/chat.ations";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ModalComponent } from "../modal/modal.component";
import { User } from "../../auth/model/user.model";
import { currentUser } from "../../auth/selectors/auth.selectors";
import { AuthService } from "../../auth/services/auth.service";

@Component({
  selector: "chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.scss"],
})
export class ChatRoomComponent implements OnInit {

  listOfRooms$: Observable<ChatRoom[]>;
  newName: string;
  name: string;

  constructor(
    public authService: AuthService,
    private store: Store<fromActions.RoomState>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.authService.getUser();
   this.listOfRooms$ = this.store.pipe(select(selectAllRooms));
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: "250px",
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newName = result;
      this.createRoom(this.newName, user);
    });
  }

  createRoom(room: string, user: User): void {
    this.newName = room;
    if (room === "" || room === null) {
      room = "";
    } else {
      this.store.dispatch(actions.roomWasCreated({user, room }));
    }
  }

  joinRoom(user: User, room: ChatRoom): void {
    this.store.dispatch(actions.joiningRoom({ user, room }));
    this.router.navigate(["chat", room.id]);
  }
}
