import { TestBed } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../../../auth/model/user.model";
import { UserService } from "../user.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import { AuthDatabaseService } from "../database.wrappers/auth.wrappers";
import firebase from "firebase/compat/app";

describe("UserService", () => {

  let serviceUnderTest: UserService;
  let databaseWrapper: AuthDatabaseService;

  let fakeCredential: User;
  let fakeUser: firebase.User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers: [
        UserService,
        { provide: AuthDatabaseService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
        { provide: AngularFirestore, useValue: {} }
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(UserService);
    serviceUnderTest.getUserAsync = jasmine.createSpy('getUser').and
     .callFake(() => Promise.resolve(fakeCredential));

     databaseWrapper = TestBed.inject(AuthDatabaseService);
     databaseWrapper.signOut = jasmine.createSpy('signOut')
                    .and.callFake(() => Promise.resolve(fakeUser));

    databaseWrapper.navigateByUrl = jasmine.createSpy('navigateByUrl')
                   .and.returnValue(Promise.resolve("/"));

    databaseWrapper.getUserdata = jasmine.createSpy('getUserdata')
                   .and.callFake(() => Promise.resolve(fakeCredential));

    databaseWrapper.updateUserData = jasmine.createSpy('updateUserData')
                   .and.callFake(() => Promise.resolve(fakeCredential));

    fakeCredential = {
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
      const service: UserService = TestBed.get(UserService);
      //Assert
      expect(service).toBeTruthy();
    });
  });

  describe("getUser", () => {
    it("should get current user", async() => {
      //Act
      await serviceUnderTest.getUserAsync();
      //Assert
      expect(serviceUnderTest.getUserAsync).toHaveBeenCalled();
    })
   });

   describe("logoutUser", () => {
    it("should get current user", async() => {
      //Act
      await serviceUnderTest.logoutUser();
      //Assert
      expect(databaseWrapper.signOut).toHaveBeenCalled();
    });

    it("should get current user", async() => {
      //Arrange
      const url: string = "/";
      //Act
      await serviceUnderTest.logoutUser();
      //Assert
      expect(databaseWrapper.navigateByUrl).toHaveBeenCalledWith(url);
    });
   });

   describe("getUserData", () => {
    it("should get current user", async() => {
      //Arrange
      const doc: string = "xasd$3fdsk";
      //Act
      await serviceUnderTest.getUserData(doc);
      //Assert
      expect(databaseWrapper.getUserdata).toHaveBeenCalledWith(doc);
    });
   });

   describe("updateUserData", () => {
    it("should update user data", async() => {
     //Arrange
     const uid: string = "xasd$3fdsk";
     const roomId: string = "sdf3543tdesf";
     //Act
     await serviceUnderTest.updateUserData(uid, roomId);
     //Assert
     expect(databaseWrapper.updateUserData).toHaveBeenCalledWith(fakeCredential.uid, fakeCredential.roomId);
    });
   });
});
