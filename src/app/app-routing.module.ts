import {
  Routes,
  RouterModule,
  PreloadAllModules,
} from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./index/index.module").then(m => m.IndexModule),
  }, {
    path: "departments", 
    loadChildren: () => import("./department/department.module").then(m => m.DepartmentModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
