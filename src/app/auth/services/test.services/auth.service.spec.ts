import { TestBed } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from "../auth.service";
import { User } from "../../model/user.model";
import { AuthDatabaseService } from "../database.wrappers/auth.wrappers";
import firebase from "firebase/compat/app";

describe("AuthService", () => {
  let serviceUnderTest: AuthService;
  let databaseWrapper: AuthDatabaseService;

  let fakeCredential: User;
  let fakeUser: firebase.User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AuthDatabaseService, useValue: {} },
        { provide: AngularFirestore, useValue: {} },
        { provide: AngularFireAuth, useValue: {} },
      ],
    });
  });

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(AuthService);
    serviceUnderTest.getUser = jasmine.createSpy('getUser').and
    .callFake(() => Promise.resolve(fakeCredential));

    databaseWrapper = TestBed.inject(AuthDatabaseService);
    databaseWrapper.signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword')
                   .and.callFake(() => Promise.resolve(fakeCredential));

    databaseWrapper.setItem = jasmine.createSpy('setItem')
                   .and.callFake(() => Promise.resolve(fakeUser));

    databaseWrapper.setUserData = jasmine.createSpy('setUserData')
                   .and.callFake(() => Promise.resolve(fakeUser));

    databaseWrapper.createUserWithEmailAndPassword = jasmine.createSpy('createUserWithEmailAndPassword')
                   .and.callFake(() => Promise.resolve(fakeCredential));

    databaseWrapper.getItem = jasmine.createSpy('getItem')
                   .and.callFake(() => Promise.resolve(fakeCredential));

    databaseWrapper.signInwithpopUp = jasmine.createSpy('signInwithpopUp')
                   .and.callFake(() => Promise.resolve(fakeUser));

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
      const service: AuthService = TestBed.get(AuthService);
      //Assert
      expect(service).toBeTruthy();
    });
  });

  describe("getUser", () => {
   it("should get current user", () => {
     //Act
     serviceUnderTest.getUser();
     //Assert
     expect(serviceUnderTest.getUser).toHaveBeenCalled();
   })
  });

  describe("loginUser", () => {
    it("should sign in user with email and password", async() => {
      //Arrange
      const email: string = "adm@gmail.com";
      const password: string = "123456";
      //Act
      await serviceUnderTest.loginUser(email, password);
      //Assert
      expect(databaseWrapper.signInWithEmailAndPassword).toHaveBeenCalledWith(fakeCredential.email,fakeCredential.password);
    });

    it("should set user to local storage", async() => {
      //Arrange
      const email: string = "adm@gmail.com";
      const password: string = "123456";
      //Act
      await serviceUnderTest.loginUser(email, password);
      //Assert
      expect(databaseWrapper.setItem).toBeTruthy();
    });

    it("should set user data to firestore", async() => {
      //Arrange
      const email: string = "adm@gmail.com";
      const password: string = "123456";
      //Act
      await serviceUnderTest.loginUser(email, password);
      //Assert
      expect(databaseWrapper.setUserData).toHaveBeenCalledWith(fakeUser);
    });
  });

  describe("signUpUser", () => {
    it("should create user with email and password", async() => {
       //Arrange
       const email: string = "adm@gmail.com";
       const password: string = "123456";
       const displayName: string = "someName";
       //Act
       await serviceUnderTest.signUpUser(email, password, displayName);
       //Assert
       expect(databaseWrapper.createUserWithEmailAndPassword).toHaveBeenCalledWith(fakeCredential.email, fakeCredential.password);
    });

    it("should set user data to firestore", async() => {
      //Arrang
       const email: string = "adm@gmail.com";
       const password: string = "123456";
       const displayName: string = "someName";
       //Act
       await serviceUnderTest.signUpUser(email, password, displayName);
       //Assert
       expect(databaseWrapper.setUserData).toHaveBeenCalledWith(fakeUser);
    });
  });

  // describe("googleSignIn", () => {
  //   it("should get user from session storage", async() => {
  //   //Arrange
  //   const item: string = "user";
  //   //Act
  //   await serviceUnderTest.signinWithGoogle();
  //   //Assert
  //   expect(databaseWrapper.getItem).toBeTruthy(item);
  //  });

  //  it("should sign in with pop up", async() => {
  //   //Arrange

  //   //Act
  //   await serviceUnderTest.signinWithGoogle();
  //   //Assert
  //   expect(databaseWrapper.signInwithpopUp).toHaveBeenCalled();
  //  });

  // //  it("should set user to session storage", async() => {
  // //   //Arrange
  // //   const item: string = "user";
  // //   //Act
  // //   await serviceUnderTest.signinWithGoogle();
  // //   //Assert
  // //   expect(databaseWrapper.setItem).toBeTruthy(item);
  // //  });

  // //  it("should get user from session storage", async() => {
  // //   //Arrange
  // //   const item: string = "user";
  // //   //Act
  // //   await serviceUnderTest.signinWithGoogle();
  // //   //Assert
  // //   expect(databaseWrapper.setUserData).toHaveBeenCalledWith(fakeUser);
  // //  });
  // });
});
