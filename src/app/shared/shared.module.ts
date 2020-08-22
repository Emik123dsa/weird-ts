import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShowAuthedDirective } from "./show-authed.directive";
import { ClickOutsideDirective } from "./clickOutside";
import { DepartmentFormComponent } from "./forms";
import { ButtonComponent } from "./buttons";

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
    ButtonComponent
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
    HttpClientXsrfModule
  ]
})
export class SharedModule { }