import { TestBed } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from "../../../auth/model/user.model";
import { ChatService } from "../chat.service";
import { UserService } from "../../../auth/services/user.service";
import { ChatRoom } from "../../model/chat-room.model";
import { AuthService } from "../../../auth/services/auth.service";
import { DatabaseService } from "../database.wrappers/database.service";

describe("ChatService", () => {
  let serviceUnderTest: ChatService;
  let userService: UserService;
  let dataBaseWrapper: DatabaseService;

  let fakeUser: User;
  let fakeData: ChatRoom;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        { provide: AuthService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: AngularFirestore, useValue: {} },
        { provide: AngularFireAuth, useValue: {} },
        { provide: DatabaseService, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(ChatService);

    userService = TestBed.inject(UserService);
    userService.getUserAsync = jasmine
      .createSpy("getUserAsync")
      .and.callFake(() => Promise.resolve(fakeUser));

    dataBaseWrapper = TestBed.inject(DatabaseService);
    dataBaseWrapper.add = jasmine
      .createSpy("add")
      .and.callFake(() => Promise.resolve(fakeData));

    dataBaseWrapper.getSnapshotChanges =
      jasmine.createSpy("getSnapshotChanges");

    fakeData = {
      uid: "xasd$3fdsk",
      room: "somefakeRoom",
      createdAt: Date.now(),
    };

    fakeUser = {
      uid: "xasd$3fdsk",
      roomId: "sdf3543tdesf",
      email: "adm@gmail.com",
      displayName: "wagfdgf",
      password: "123456",
      photoURL: "huiagkjgdfas",
    };
  });
  describe("Service Under Test", () => {
    it("should be created", () => {
      //Act
      const service: ChatService = TestBed.get(ChatService);
      //Assert
      expect(service).toBeTruthy();
    });
  });

  describe("createRoom", () => {
    it("should call getUserAsync", async () => {
      // Arrange
      const roomName: string = "somefakeRoom";
      // Act
      await serviceUnderTest.createRoom(roomName);
      // Assert
      expect(userService.getUserAsync).toHaveBeenCalled();
    });

    it("should add data to firestore", async () => {
      //Arrange
      const roomName: string = "somefakeRoom";
      // Act
      await serviceUnderTest.createRoom(roomName);
      //Assert
      expect(dataBaseWrapper.add).toHaveBeenCalledWith("rooms", fakeData);
    });
  });

  describe("getChatRoom", () => {
    it("should be called with rooms", () => {
      //Act
      serviceUnderTest.getChatRoom();
      //Assert
      expect(dataBaseWrapper.getSnapshotChanges).toHaveBeenCalledWith("rooms");
    });
  });
});
