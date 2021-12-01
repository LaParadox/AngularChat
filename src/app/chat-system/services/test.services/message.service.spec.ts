import { TestBed } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../../../auth/model/user.model";
import { UserService } from "../../../auth/services/user.service";
import { ChatMessage } from "../../model/chat.model";
import { DatabaseService } from "../database.wrappers/database.service";
import { MessageService } from "../message.service";

describe("MessageService", () => {
  let serviceUnderTest: MessageService;
  let userService: UserService;
  let dataBaseWrapper: DatabaseService;

  let fakeUser: User;
  let fakeData: ChatMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: UserService, useValue: {} },
        { provide: AngularFirestore, useValue: {} },
        { provide: DatabaseService, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(MessageService);

    userService = TestBed.inject(UserService);
    userService.getUserAsync = jasmine
      .createSpy("getUserAsync")
      .and.callFake(() => Promise.resolve(fakeUser));

    dataBaseWrapper = TestBed.inject(DatabaseService);
    dataBaseWrapper.getSnapshotChanges = jasmine.createSpy('getSnapshotChanges');

    dataBaseWrapper.add = jasmine.createSpy('add').and.callFake(() =>
     Promise.resolve(fakeData)
    );

    fakeUser = {
      uid: "xasd$3fdsk",
      roomId: "sdf3543tdesf",
      email: "adm@gmail.com",
      displayName: "wagfdgf",
      password: "123456",
      photoURL: "huiagkjgdfas",
    };

    fakeData = {
      uid: "xasd$3fdsk",
      roomId: "sdf3543tdesf",
      email: "adm@gmail.com",
      displayName: "wagfdgf",
      photoURL: "huiagkjgdfas",
      content: 'someFakeMessage',
      createdAt: Date.now(),
    };
  });

  describe("Service Under Test", () => {
    it("should be created", () => {
      const service: MessageService = TestBed.get(MessageService);
      expect(service).toBeTruthy();
    });
  });

  describe("getChatMessages", () => {
    it("should be called with chat data", () => {
      //Act
      serviceUnderTest.getChatMessages();
      //Assert
      expect(dataBaseWrapper.getSnapshotChanges).toHaveBeenCalledWith("chats");
    });
  });

  describe("sendMessage", () => {
    it("should call getUserAsync", async () => {
      // Arrange
      const content: string = "someFakeMessage";
      // Act
      await serviceUnderTest.sendMessage(content, fakeUser);
      // Assert
      expect(userService.getUserAsync).toHaveBeenCalled();
    });

    it("should add data to firestore", async () => {
      //Arrange
      const content: string = "someFakeMessage";
      // Act
      await serviceUnderTest.sendMessage(content, fakeUser);
      //Assert
      expect(dataBaseWrapper.add).toHaveBeenCalledWith("chats", fakeData);
    });
  });
});
