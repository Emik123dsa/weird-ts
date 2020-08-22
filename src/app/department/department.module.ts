import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DepartmentCreate } from "./departmentCreate";
import { DepartmentList } from "./departmentList";
import { DepartmentEdit } from "./departmentEdit";
import { DepartmentComponent } from "./department.component";

import { DepartmentRoutingModule } from "./department-routing.module";
import { SharedModule } from "../shared";

import { HttpClientModule } from "@angular/common/http";

import { DepartmentItem } from "./departmentItem";

import { DepartmentSearch } from "./departmentSearch";

@NgModule({
  imports: [SharedModule, DepartmentRoutingModule],
  declarations: [DepartmentComponent, DepartmentEdit, DepartmentList, DepartmentCreate, DepartmentSearch, DepartmentItem],
})
export class DepartmentModule { }
