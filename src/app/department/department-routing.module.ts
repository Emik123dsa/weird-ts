import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DepartmentCreate } from "./departmentCreate";
import { DepartmentList } from "./departmentList";
import { DepartmentEdit } from "./departmentEdit";
import { DepartmentComponent } from './department.component';

const routes: Routes = [
  {
    path: "",
    component: DepartmentComponent,
  
    children: [
      {
        path: "create",
        component: DepartmentCreate,
      }, {
        path: "edit/:currentId",
        component: DepartmentEdit
      }, {
        path: "",
        component: DepartmentList
      }]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }