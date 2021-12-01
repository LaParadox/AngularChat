import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { User } from "../model/user.model";
import { AuthService } from "./auth.service";
import { AuthDatabaseService } from "./database.wrappers/auth.wrappers";

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    private databaseWrapper: AuthDatabaseService
  ) {}

  getUserAsync(): Promise<User> {
    return this.authService.user$.pipe(take(1)).toPromise();
  }

  async logoutUser(): Promise<void> {
    await this.databaseWrapper.signOut();
    this.databaseWrapper.navigateByUrl("/");
  }

   getUserData(user: string): Promise<User> {
    return this.databaseWrapper.getUserdata(user);
  }

  updateUserData(uid: string | number, roomId: string | number): Promise<void> {
   return this.databaseWrapper.updateUserData(uid, roomId);
  }
}
