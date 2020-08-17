import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { IndexComponent } from "./index/index.component";
import { HomeRoutingModule } from "./index-routing.module";
import { SharedModule } from "../shared";

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [IndexComponent],
})
export class IndexModule { }
