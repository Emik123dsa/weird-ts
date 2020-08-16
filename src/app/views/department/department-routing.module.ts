import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentCreate } from "../../components/departmentCreate";
import { DepartmentList } from "../../components/departmentList";
import { DepartmentEdit } from "../../components/departmentEdit";

const routes: Routes = [
  {
    path: "departments/create",
    component: DepartmentCreate,
  }, {
    path: "departments/edit/:currentId",
    component: DepartmentEdit
  }, {
    path: "departments",
    component: DepartmentList
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }