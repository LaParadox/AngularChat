import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { signUp } from "../actions/auth.actions";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      displayName: ["", Validators.required],
      password: ["", [Validators.required]],
    });
  }

  async singUp(): Promise<void> {
    const val = this.form.value;
    try {
      await this.auth.signUpUser(val.email, val.displayName, val.password);
      const userProfile = sessionStorage.getItem("user");
      this.store.dispatch(signUp({ user: JSON.parse(userProfile) }));
      sessionStorage.removeItem("user");
      this.router.navigateByUrl("/");
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  ngOnInit(): void {}
}
