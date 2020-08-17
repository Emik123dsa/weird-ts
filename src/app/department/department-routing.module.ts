import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DepartmentCreate } from "./departmentCreate";
import { DepartmentList } from "./departmentList";
import { DepartmentEdit } from "./departmentEdit";

const routes: Routes = [
  {
    path: "create",
    component: DepartmentCreate,
  }, {
    path: "edit/:currentId",
    component: DepartmentEdit
  }, {
    path: "",
    component: DepartmentList
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }