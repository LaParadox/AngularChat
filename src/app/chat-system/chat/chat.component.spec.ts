import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Action, Store, StoreModule } from "@ngrx/store";
import { AuthService } from "../../auth/services/auth.service";
import { ChatComponent } from "./chat.component";
import firebase from "firebase/compat/app";
import { User } from "../../auth/model/user.model";
import { ChatMessage } from "../model/chat.model";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { currentUser } from "../../auth/selectors/auth.selectors";
import { AuthState } from "../../auth/reducers";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let authService: AuthService;

  let store: MockStore<AuthState>;
  let user: firebase.User;

  const initialState: AuthState = {
   user: {
    uid: "xasd$3fdsk",
    roomId: "sdf3543tdesf",
    email: "adm@gmail.com",
    displayName: "wagfdgf",
    password: "123456",
    photoURL: "huiagkjgdfas",
   },
   currentRoomId: undefined
  };

  let fakeCredential: User;
  let fakeMessage: ChatMessage;

  let action: Action;

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports:[
       StoreModule
     ],
    providers: [
      { provide: AuthService, useValue: {} },
      { provide: Store, useValue: {} },
       MockStore,
      provideMockStore({initialState})
    ],
    declarations: [
     ChatComponent
    ]
   }).compileComponents();
  });

  beforeEach(() => {
   fixture = TestBed.createComponent(ChatComponent);

   authService = TestBed.inject(AuthService);

   authService.getUser = jasmine.createSpy('getUser').and
              .callFake(() => Promise.resolve(fakeCredential));

   store = TestBed.inject(MockStore);

   store.dispatch = jasmine.createSpy('dispatch').and.callFake(() => Promise.resolve(fakeCredential));

   component = fixture.componentInstance;
   fixture.detectChanges();

   fakeCredential = {
    uid: "xasd$3fdsk",
    roomId: "sdf3543tdesf",
    email: "adm@gmail.com",
    displayName: "wagfdgf",
    password: "123456",
    photoURL: "huiagkjgdfas",
  };

  fakeMessage ={
    roomId:"sdf3543tdesf",
    email: "adm@gmail.com",
    displayName: "wagfdgf",
    photoURL: "huiagkjgdfas",
    content: "someContent",
    uid: "xasd$3fdsk",
    createdAt: Date.now()
  };
  });

  it('should create chat component', () => {
    //Assert
   expect(component).toBeTruthy();
  });

  describe('getUser', () => {
   it('should get current user', () => {
     //Assert
     expect(authService.getUser).toHaveBeenCalled();
   });
  });

  describe('currentUser', () => {
   it('should select a current user', () => {
     //Arrange
    const data = store.overrideSelector(currentUser, fakeCredential);
    //Assert
    expect(data).toBeDefined();
   });
  });

  describe('send', () => {
   it('should dispatch action message sent', () => {
    //Arrange
    const message: string = "someContent";
    //Act
    component.send(message, fakeCredential);
    //Assert
    expect(store.dispatch).toHaveBeenCalled();
   });
  });
});

