import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DepartmentCreate } from "./departmentCreate";
import { DepartmentList } from "./departmentList";
import { DepartmentEdit } from "./departmentEdit";

import { DepartmentRoutingModule } from "./department-routing.module";
import { SharedModule } from "../shared";

@NgModule({
  imports: [SharedModule, DepartmentRoutingModule],
  declarations: [DepartmentEdit, DepartmentList, DepartmentCreate],
})
export class DepartmentModule { }
