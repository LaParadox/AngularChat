import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChatMessage } from "../model/chat.model";
import { UserService } from "../../auth/services/user.service";
import { User } from "../../auth/model/user.model";
import { DatabaseService } from "./database.wrappers/database.service";

@Injectable()
export class MessageService {

  constructor(
    private userService: UserService,
    private dataBaseWrapper: DatabaseService){}

  getChatMessages(): Observable<ChatMessage[]> {
    return this.dataBaseWrapper.getSnapshotChanges<ChatMessage>("chats");
  }

  async sendMessage(content: string, roomId: User): Promise<void> {
    try {
      const user = await this.userService.getUserAsync();

      const data: ChatMessage = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        content,
        roomId: roomId.roomId,
        createdAt: Date.now()
      };

      this.dataBaseWrapper.add('chats', data);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
