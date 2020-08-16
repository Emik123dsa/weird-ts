import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";
import { FooterComponent } from "./components/footer";
import { HeaderComponent } from "./components/header";

import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF } from '@angular/common';
import { IndexModule } from "./views/index/index.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    IndexModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppModule { }
