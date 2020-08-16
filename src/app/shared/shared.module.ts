import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShowAuthedDirective } from "./show-authed.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    ShowAuthedDirective,
  ],
  exports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ShowAuthedDirective,
  ]
})
export class SharedModule { }