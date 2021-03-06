import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import { ClickOutsideDirective } from './clickOutside';
import { DepartmentFormComponent } from './forms';
import { ButtonComponent } from './buttons';
import { DropDownComponent } from './dropdown';
import { DepartmentFormPipe } from './forms/department.form.pipe';
import { CamelCasePipe } from './camelcase.pipe';
import { ModalDeleteComponent } from './modalDelete/modal.delete.component';
import { ModalAddFieldComponent } from './modalAddField/modal.add.field.component';
import { ModalRemoveFieldComponent } from './modalRemoveField';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        HttpClientXsrfModule,
    ],
    declarations: [
        ShowAuthedDirective,
        DepartmentFormComponent,
        ClickOutsideDirective,
        ButtonComponent,
        DropDownComponent,
        DepartmentFormPipe,
        CamelCasePipe,
        ModalDeleteComponent,
        ModalAddFieldComponent,
        ModalRemoveFieldComponent,
    ],
    exports: [
        CommonModule,
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
        CamelCasePipe,
        ModalDeleteComponent,
        ModalAddFieldComponent,
        ModalRemoveFieldComponent,
    ],
})
export class SharedModule {}
