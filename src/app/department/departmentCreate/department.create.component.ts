import {
    SetDepartmentsInfoFields,
    SetDepartmentsContactPersonsFieldsSuccess,
    SetDepartmentsContactPersonsFields,
    DepartmentSubFieldsModel,
    DepartmentFieldsModel,
    SetDepartmentFieldsModel,
    SetDepartmentsFieldsModel,
    RemoveCurrentDepartment,
    AddDepartment,
} from './../../store/actions/department.action';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { DepartmentService } from '../../core/services';

import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import * as camelCase from 'camelcase';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import {
    Department,
    DepartmentFields,
    DepartmentSetterModel,
} from '../../core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import {
    selectVendorContactPersonsFields,
    selectVendorFields,
    selectVendorInfoFields,
} from '../../store/selectors/department.selector';
import { take } from 'rxjs/operators';
import { GetModal, GetDropDown } from '../../store/actions/utils.action';

@Component({
    selector: '<department-create-vendor>',
    templateUrl: './department.create.component.html',
    styleUrls: ['./department.create.component.scss'],
})
export class DepartmentCreateComponent implements OnInit, OnDestroy {
    public title = 'Department Create';

    private departmentFields$ = this._store.pipe(select(selectVendorFields));

    private departmentForm: FormGroup;

    private errors: Object = {};

    public constructor(
        private departmentService: DepartmentService,
        private route: ActivatedRoute,
        private router: Router,
        private fB: FormBuilder,
        private _store: Store<AppState>,
    ) {
        this.departmentFields$.subscribe(
            (
                data: Pick<Department, 'info_fields' | 'contact_person_fields'>,
            ): void => {
                this.departmentForm = this.fB.group({
                    info_fields: data.info_fields,
                    contact_person_fields: data.contact_person_fields,
                } as Pick<Department, 'info_fields' | 'contact_person_fields'>);
            },
        );
    }

    protected convertToNormalFormGroup<
        T extends keyof DepartmentFields<K, K>,
        K extends DepartmentSetterModel
    >({ essential_fields, additional_fields }: DepartmentFields<K, K>): Object {
        const selectedEssentialFields: Object = essential_fields.reduce(
            (acc: K, sub: K): Object => {
                acc = { ...acc, [sub.name]: sub.value };
                return acc;
            },
            [],
        );

        const selectedAdditionalFields: Object = additional_fields.reduce(
            (
                acc: DepartmentSetterModel,
                sub: DepartmentSetterModel,
            ): Object => {
                acc = { ...acc, [sub.name]: sub.value };
                return acc;
            },
            [],
        );

        return Object.assign(selectedEssentialFields, selectedAdditionalFields);
    }

    public dispatchFieldsToProps(
        type: string,
        sub_type?: string,
        item?: DepartmentSetterModel,
    ): void {
        const mutatedFields: SetDepartmentsFieldsModel = {
            fields: type as DepartmentFieldsModel,
            sub_fields: sub_type as DepartmentSubFieldsModel,
            regenerator: {
                key: item.key,
                value: this.departmentForm.value[type][item.name],
                name: item.name,
            },
        };
        switch (type) {
            case 'info_fields':
                this._store.dispatch(
                    new SetDepartmentsInfoFields(mutatedFields),
                );

                break;
            case 'contact_person_fields':
                this._store.dispatch(
                    new SetDepartmentsContactPersonsFields(mutatedFields),
                );
                break;
        }
    }

    public cancelDepartment(e: MouseEvent): void {
        this.router.navigateByUrl('/departments');
    }

    public storeDepartment(e: MouseEvent) {
        /**
         *  GET ID FROM CURRENT TIME
         */
        const currentId: string = new Date().getTime().toString();

        const name:
            | DepartmentSetterModel
            | undefined = this.departmentForm.value.info_fields[
            'essential_fields'
        ].find((data: DepartmentSetterModel): boolean => data.name === 'name');

        if (this.departmentForm.value && this.departmentForm.valid) {
            this._store.dispatch(
                new AddDepartment({
                    id: Number(currentId),
                    department_name: name.value,
                    photo_vendor: '',
                    activated: true,
                    info_fields: this.departmentForm.value.info_fields,
                    contact_person_fields: this.departmentForm.value
                        .contact_person_fields,
                }),
            );

            this.cancelDepartment(e as MouseEvent);
        }
    }

    public ngOnDestroy() {
        if (this.departmentFields$) {
            this.departmentFields$.pipe(take(1));
        }
    }

    public addNewField<
        T extends keyof Pick<
            Department,
            'info_fields' | 'contact_person_fields'
        >
    >(type: T) {
        this._store.dispatch(
            new GetModal({
                activated: true,
                type,
                id: 0,
            }),
        );
    }

    public ngOnInit() {}
}
