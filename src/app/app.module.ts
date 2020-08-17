import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";
import { FooterComponent } from "./shared/layouts/footer";
import { HeaderComponent } from "./shared/layouts/header";

import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF } from '@angular/common';
import { IndexModule } from "./index/index.module";
import { DepartmentModule } from "./department/department.module";

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
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
