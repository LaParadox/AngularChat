import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule } from "@angular/router";
import { AuthModule } from "./auth/module/auth.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";

import { EffectsModule } from "@ngrx/effects";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { metaReducers, reducers } from "./reducers";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatCardModule } from "@angular/material/card";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { routes } from "./app-routing";
import { HomeComponent } from "./home/home.component";
import { AngularFireModule } from "@angular/fire/compat";
import { MatSliderModule } from "@angular/material/slider";
import { ChatModule } from "./chat-system/module/chat.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    HttpClientModule,
    MatSliderModule,
    InfiniteScrollModule,
    MatMenuModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AuthModule.forRoot(),
    ChatModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal
    }),
    MDBBootstrapModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
