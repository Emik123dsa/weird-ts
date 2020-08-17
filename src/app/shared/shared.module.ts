import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShowAuthedDirective } from "./show-authed.directive";
import { DepartmentFormComponent } from "./forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  declarations: [
    ShowAuthedDirective,
    DepartmentFormComponent
  ],
  exports: [CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ShowAuthedDirective,
    DepartmentFormComponent,
    HttpClientXsrfModule
  ]
})
export class SharedModule { }