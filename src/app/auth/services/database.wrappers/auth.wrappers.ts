import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
  AngularFirestore, AngularFirestoreDocument
} from "@angular/fire/compat/firestore";
import { NavigationBehaviorOptions, Router, UrlTree } from "@angular/router";
import firebase from "firebase/compat/app";
import { User } from "../../model/user.model";

@Injectable()
export class AuthDatabaseService {
  constructor(private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router) {}

  signInWithEmailAndPassword<T>(email: string, password: string): Promise<firebase.auth.UserCredential>{
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword<T>(email: string, password: string): Promise<firebase.auth.UserCredential>{
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  setItem<T>(key: string, value: T): void{
    sessionStorage.setItem(key, JSON.stringify(value));
  }

   setUserData(user: firebase.User): Promise<void> {
    const userRef: AngularFirestoreDocument<firebase.firestore.DocumentData> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

   return userRef.set(data, { merge: true });
  }

  getItem<T>(key: string): void{
    sessionStorage.getItem(key);
  }

   signInwithpopUp(provider: firebase.auth.AuthProvider):Promise<firebase.auth.UserCredential>{
    return this.auth.signInWithPopup(provider);
  }

  signOut(): Promise<void>{
    return this.auth.signOut();
  }

  navigateByUrl(url: string | UrlTree, extras?: NavigationBehaviorOptions): Promise<boolean>{
   return this.router.navigateByUrl(url);
  }

  async getUserdata<T>(user: string): Promise<T>{
      const snapshot = await this.afs
        .collection<T>("users")
        .doc(user)
        .ref.get();
      const data = snapshot.data();
      return data;
  }

  updateUserData(uid: string | number, roomId: string | number): Promise<void>{
    const userRef: AngularFirestoreDocument<firebase.firestore.DocumentData> = this.afs.doc(`users/${uid}`);

    const data: User = {
      roomId
    };

    return userRef.update(data);
  }
}
