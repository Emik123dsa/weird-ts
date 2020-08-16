import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { IndexComponent } from "../../components/index/index.component";
import { HomeRoutingModule } from "./index-routing.module";
import { SharedModule } from "../../shared";

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [IndexComponent],
})
export class IndexModule { }
