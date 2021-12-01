import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/guard/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { ChatRoomComponent } from "./chat-system/chat-room/chat-room.component";
import { ChatComponent } from "./chat-system/chat/chat.component";
import { ChatResolver } from "./chat-system/resolvers/chats.resolver";
import { RoomsResolver } from "./chat-system/resolvers/rooms.resolver";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "chat",
    component: ChatRoomComponent,
    canActivate: [AuthGuard],
    resolve: {
      chat: RoomsResolver,
    }
  },
  {
    path: "chat/:id",
    component: ChatComponent,
    canActivate: [AuthGuard],
    resolve: {
      room: ChatResolver,
    }
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

export class AppRoutingModule {}
