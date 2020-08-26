import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShowAuthedDirective } from "./show-authed.directive";
import { ClickOutsideDirective } from "./clickOutside";
import { DepartmentFormComponent } from "./forms";
import { ButtonComponent } from "./buttons";
import { DropDownComponent } from "./dropdown";
import { DepartmentFormPipe } from "./forms/department.form.pipe";
import { CamelCasePipe } from "./camelcase.pipe";
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
    DepartmentFormComponent,
    ClickOutsideDirective,
    ButtonComponent,
    DropDownComponent,
    DepartmentFormPipe,
    CamelCasePipe
  ],
  exports: [CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    ShowAuthedDirective,
    ButtonComponent,
    DepartmentFormComponent,
    ClickOutsideDirective,
    HttpClientXsrfModule,
    DropDownComponent,
    DepartmentFormPipe,
    CamelCasePipe
  ]
})
export class SharedModule { }