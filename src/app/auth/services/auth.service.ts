import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore,
} from "@angular/fire/compat/firestore";
import { switchMap } from "rxjs/operators";
import { User } from "../model/user.model";
import firebase from 'firebase/compat/app';
import { AuthDatabaseService } from "./database.wrappers/auth.wrappers";

@Injectable()
export class AuthService {
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore,
    private dataBaseWrapper: AuthDatabaseService) {
  }

  user$: Observable<User>;
  isLoggedIn: boolean = false;

  getUser(): void{
    this.user$ = this.auth.authState.pipe<User>(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async loginUser(email: string, password: string): Promise<void> {
    try {
      const res: firebase.auth.UserCredential = await this.dataBaseWrapper.signInWithEmailAndPassword<User>(email, password);
      this.isLoggedIn = true;
      this.dataBaseWrapper.setItem("user", res.user);
      return this.dataBaseWrapper.setUserData(res.user);
    } catch (err) {
      console.log(err);
    }
  }

  async signUpUser(email: string, password: string, displayName: string): Promise<void> {
    try {
      const res: firebase.auth.UserCredential = await this.dataBaseWrapper.createUserWithEmailAndPassword<User>(
        email,
        password
      );
      this.isLoggedIn = false;
      return this.dataBaseWrapper.setUserData(res.user);
    } catch (error) {
      console.log(`error occured`, error);
      throw error;
    }
  }

  async signinWithGoogle(): Promise<void> {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.dataBaseWrapper.getItem("user");
    this.isLoggedIn = true;
    return this.AuthLoginWithPopUp(provider);
  }

  private async AuthLoginWithPopUp(provider: firebase.auth.AuthProvider): Promise<void> {
    try {
      const credential: firebase.auth.UserCredential = await this.dataBaseWrapper.signInwithpopUp(provider);
      this.dataBaseWrapper.setItem("user", credential.user);
      this.isLoggedIn = false;
      return this.dataBaseWrapper.setUserData(credential.user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
