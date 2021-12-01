import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
import { login, loginWithGoogle } from "../actions/auth.actions";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  async login(): Promise<void> {
    const val = this.form.value;

    try {
      await this.auth.loginUser(val.email, val.password);
      const temp = sessionStorage.getItem("user");
      this.store.dispatch(login({ user: JSON.parse(temp) }));
      this.router.navigateByUrl("/chat");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async googleSignIn(): Promise<void> {
    try {
      this.store.dispatch(loginWithGoogle());
      this.router.navigateByUrl("/chat");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
