import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";
import { FooterComponent } from "./shared/layouts/footer";
import { HeaderComponent } from "./shared/layouts/header";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF } from '@angular/common';
import { IndexModule } from "./index/index.module";
import { DepartmentModule } from "./department/department.module";

import { environment } from "../environment/environment.dev";

import { HttpClientModule } from '@angular/common/http';
import { appReducer } from "./store/reducers/app.reducer";
import { DepartmentEffect } from './store/effects/department.effect';
import { ConfigEffect } from './store/effects/config.effect';
import { StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([DepartmentEffect, ConfigEffect]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }) : [],
    BrowserModule,
    FormsModule,
    CoreModule,
    IndexModule,
    DepartmentModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppModule { }
