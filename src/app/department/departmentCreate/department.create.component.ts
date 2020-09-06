import { TypeModal } from './../../core/models/utils.model/utils.model';
import { DepartmentSetterModel } from './../../core/models/department.model/department.fields.model';

import { animate, style, transition, trigger } from '@angular/animations';
import {
    SetDepartmentsInfoFields,
    SetDepartmentsContactPersonsFieldsSuccess,
    SetDepartmentsContactPersonsFields,
    DepartmentSubFieldsModel,
    DepartmentFieldsModel,
    RemoveCurrentDepartment,
    AddDepartment,
} from './../../store/actions/department.action';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { DepartmentService } from '../../core/services';

import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as camelCase from 'camelcase';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { Department, DepartmentFields } from '../../core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import {
    selectVendorContactPersonsFields,
    selectVendorFields,
    selectVendorInfoFields,
} from '../../store/selectors/department.selector';
import { take, distinctUntilChanged, startWith } from 'rxjs/operators';
import { GetModal, GetDropDown } from '../../store/actions/utils.action';

@Component({
    selector: '<department-create-vendor>',
    templateUrl: './department.create.component.html',
    styleUrls: ['./department.create.component.scss'],
    animations: [
        trigger('departmentTrigger', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
        ]),
    ],
})
export class DepartmentCreateComponent implements OnInit {
    public title = 'Department Create';

    private departmentFields$ = this._store.pipe(select(selectVendorFields));

    private departmentForm: FormGroup;

    private errors: Object = {};

    public ngOnInit() {}

    public constructor(
        private departmentService: DepartmentService,
        private route: ActivatedRoute,
        private router: Router,
        private fB: FormBuilder,
        private _store: Store<AppState>,
    ) {
        this.departmentFields$
            .pipe(distinctUntilChanged())
            .subscribe(
                (
                    data: Pick<
                        Department,
                        'info_fields' | 'contact_person_fields'
                    >,
                ): void => {
                    this.departmentForm = this.fB.group({
                        info_fields: data.info_fields,
                        contact_person_fields: data.contact_person_fields,
                    } as Pick<Department, 'info_fields' | 'contact_person_fields'>);
                },
            );
    }

    public dispatchFieldsToProps({
        key,
        name,
        value,
    }: DepartmentSetterModel): void {
        switch (key) {
            case 'info_fields':
                this._store.dispatch(
                    new SetDepartmentsInfoFields({
                        sub_fields: name as DepartmentSubFieldsModel,
                        mutated_fields: this.departmentForm.value[key][name][
                            value
                        ],
                    }),
                );
                break;
            case 'contact_person_fields':
                this._store.dispatch(
                    new SetDepartmentsContactPersonsFields({
                        sub_fields: name as DepartmentSubFieldsModel,
                        mutated_fields: this.departmentForm.value[key][name][
                            value
                        ],
                    }),
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
            | undefined = this.departmentForm.value.info_fields.essential_fields.find(
            (data: DepartmentSetterModel): boolean => data.name === 'name',
        );

        if (this.departmentForm.valid) {
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

    public removeAdditionalFields<T extends DepartmentSetterModel>(
        e: DepartmentSetterModel,
    ) {
        this._store.dispatch(
            new GetModal({
                activated: true,
                type: ('delete' + '|' + e.key) as TypeModal,
                id: null,
                bind: e.name,
            }),
        );
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
                id: null,
            }),
        );
    }
}
