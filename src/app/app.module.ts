import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core";

@NgModule({
  imports: [BrowserModule, FormsModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
