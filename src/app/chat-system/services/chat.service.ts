import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChatRoom } from "../model/chat-room.model";
import { UserService } from "../../auth/services/user.service";
import { DatabaseService } from "./database.wrappers/database.service";

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    private dataBaseWrapper: DatabaseService
  ) {}

  async createRoom(room: string): Promise<void> {
    try {
      const user = await this.userService.getUserAsync();

      const data: ChatRoom = {
        uid: user.uid,
        room: room,
        createdAt: Date.now(),
      };
      this.dataBaseWrapper.add("rooms", data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getChatRoom(): Observable<ChatRoom[]> {
    return this.dataBaseWrapper.getSnapshotChanges<ChatRoom>("rooms");
  }
}
