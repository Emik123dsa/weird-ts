import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";
import { FooterComponent } from "./footer";
import { HeaderComponent } from "./header";

import { AppRoutingModule } from "./app-routing.module";

import { HomeModule } from "./home/home.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
