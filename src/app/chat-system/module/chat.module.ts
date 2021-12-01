import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ChatComponent } from "../chat/chat.component";
import { MatSliderModule } from "@angular/material/slider";
import { LoginComponent } from "../../auth/login/login.component";
import { ChatService } from "../services/chat.service";
import { ChatEffects } from "../effects/chat.effects";
import { chatReducer } from "../reducers";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { EntityMetadataMap } from "@ngrx/data";
import { ChatResolver } from "../resolvers/chats.resolver";
import { ChatRoomComponent } from "../chat-room/chat-room.component";
import { roomReducer } from "../reducers/index2";
import { MatDialogModule } from "@angular/material/dialog";
import { RoomsResolver } from "../resolvers/rooms.resolver";
import { RouterModule } from "@angular/router";
import { ModalComponent } from "../modal/modal.component";
import { MessageService } from "../services/message.service";
import { DatabaseService } from "../services/database.wrappers/database.service";

const entityMetaData: EntityMetadataMap = {
  Course: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatMenuModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    StoreModule.forFeature("rooms", roomReducer),
    StoreModule.forFeature("chat", chatReducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
  declarations: [ChatComponent, LoginComponent, ChatRoomComponent, ModalComponent],
  exports: [ChatComponent, LoginComponent],
  providers: [ChatService, MessageService, DatabaseService ,ChatResolver, RoomsResolver],
})
export class ChatModule {
  static forRoot(): ModuleWithProviders<ChatModule> {
    return {
      ngModule: ChatModule,
      providers: [ChatService, MessageService, DatabaseService, ChatResolver, RoomsResolver],
    };
  }
}
