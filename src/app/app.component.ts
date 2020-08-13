import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  styleUrls: ["./shared/layouts/app.component.scss"],
  templateUrl: "./shared/layouts/app.component.html",
})
export class AppComponent {
  public vova: string = "vova";

  public hello(e): void {
    console.log(e)
  }
}