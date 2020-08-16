import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DepartmentCreate } from "../../components/departmentCreate";
import { DepartmentList } from "../../components/departmentList";
import { DepartmentEdit } from "../../components/departmentEdit";

import { DepartmentRoutingModule } from "./department-routing.module";
import { SharedModule } from "../../shared";

@NgModule({
  imports: [DepartmentRoutingModule, SharedModule],
  declarations: [DepartmentEdit, DepartmentList, DepartmentCreate],
})
export class DepartmentModule { }
