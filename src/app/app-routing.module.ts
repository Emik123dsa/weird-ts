import {
  Routes,
  CanActivate,
  RouterModule,
  PreloadAllModules,
} from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "home",
    loadChildren: "./home/home.module.ts#HomeModule",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
