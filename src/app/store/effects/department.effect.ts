import {
    DepartmentFields,
    DepartmentSetterModel,
} from './../../core/models/department.model/department.fields.model';

import {
    SetDepartmentContactPersonsFields,
    SetDepartmentContactPersonsFieldsSuccess,
    SetDepartmentInfoFields,
    SetDepartmentsContactPersonsFields,
    SetDepartmentsInfoFields,
    SetDepartmentsContactPersonsFieldsSuccess,
    SetDepartmentInfoFieldsSuccess,
    SetDepartmentsInfoFieldsSuccess,
    SetCurrentDepartment,
    SetCurrentDepartmentSuccess,
    RemoveCurrentDepartment,
    RemoveCurrentDepartmentSuccess,
} from './../actions/department.action';

import { Effect, ofType, Actions } from '@ngrx/effects';

import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';

import { Department } from '../../core/models';

import {
    GetDepartment,
    GetDepartments,
    GetDepartmentSuccess,
    GetDepartmentsSuccess,
    EnumDepartmentActions,
} from '../actions/department.action';
import { DepartmentService } from '../../core/services';
import {
    map,
    switchMap,
    withLatestFrom,
    distinctUntilChanged,
    debounceTime,
} from 'rxjs/operators';
import {
    selectDepartment,
    selectDepartmentsList,
    selectVendorContactPersonsFields,
    selectVendorInfoFields,
} from '../selectors/department.selector';
import { of, Observable } from 'rxjs';
@Injectable()
export class DepartmentEffect {
    constructor(
        private _actions$: Actions,
        private _departmentService: DepartmentService,
        private _store: Store<AppState>,
    ) {}

    @Effect()
    getDepartments$ = this._actions$.pipe(
        ofType<GetDepartments>(EnumDepartmentActions.GetDepartments),
        switchMap(() => this._departmentService.getAll()),
        switchMap((departmentHttp: Department[]) =>
            of(new GetDepartmentsSuccess(departmentHttp)),
        ),
    );

    @Effect()
    getDepartment$ = this._actions$.pipe(
        ofType<GetDepartment>(EnumDepartmentActions.GetDepartment),
        map((action) => action.payload),
        withLatestFrom(this._store.pipe(select(selectDepartment))),
        switchMap(([id, departments]) => {
            return of(new GetDepartmentSuccess(departments));
        }),
    );

    @Effect()
    setDepartmentContactPersonsFields$ = this._actions$.pipe(
        ofType<SetDepartmentContactPersonsFields>(
            EnumDepartmentActions.SetDepartmentContactPersonsFields,
        ),
        map((action) => action.payload),
        withLatestFrom(
            this._store.pipe(select(selectVendorContactPersonsFields)),
        ),
        switchMap(([id, vendor]) => {
            console.log(id);

            return of(
                new SetDepartmentContactPersonsFieldsSuccess({
                    id: 123,
                    fields: 'contact_person_fields',
                    sub_fields: 'essential_fields',
                    regenerator: {
                        key: '123',
                        value: '123',
                    },
                }),
            );
        }),
    );

    @Effect()
    setDepartmentsContactPersonsFields$ = this._actions$.pipe(
        ofType<SetDepartmentsContactPersonsFields>(
            EnumDepartmentActions.SetDepartmentsContactPersonsFields,
        ),
        distinctUntilChanged(),
        map((action) => action.payload),
        withLatestFrom(
            this._store.pipe(select(selectVendorContactPersonsFields)),
        ),
        switchMap(([field, fields]) => {
            const {
                essential_fields,
                additional_fields,
            }: DepartmentFields<
                DepartmentSetterModel,
                DepartmentSetterModel
            > = fields;

            const mutatedFields: DepartmentFields<
                DepartmentSetterModel,
                DepartmentSetterModel
            > = {
                essential_fields,
                additional_fields,
            };

            const mergedMutatedFields: DepartmentSetterModel[] = essential_fields.concat(
                additional_fields,
            );

            if (
                mergedMutatedFields.some(
                    (item: DepartmentSetterModel): boolean =>
                        item.name === field.regenerator.name,
                )
            ) {
                mutatedFields[field.sub_fields] = fields[field.sub_fields].map(
                    (item: DepartmentSetterModel): DepartmentSetterModel => {
                        if (item.name === field.regenerator.name) {
                            return field.regenerator;
                        } else {
                            return item;
                        }
                    },
                );
            }
            return of(
                new SetDepartmentsContactPersonsFieldsSuccess({
                    contact_person_fields: mutatedFields,
                }),
            );
        }),
    );

    @Effect()
    setDepartmentInfoFields$ = this._actions$.pipe(
        ofType<SetDepartmentInfoFields>(
            EnumDepartmentActions.SetDepartmentInfoFields,
        ),
        map((action) => action.payload),
        withLatestFrom(this._store.pipe(select(selectVendorInfoFields))),
        switchMap(([id, vendor]) => {
            console.log(id);

            return of(
                new SetDepartmentInfoFieldsSuccess({
                    id: 123,
                    sub_fields: 'essential_fields',
                    fields: 'info_fields',
                    regenerator: {
                        key: '123',
                        value: '123',
                    },
                }),
            );
        }),
    );

    @Effect()
    setDepartmentsInfoFields$ = this._actions$.pipe(
        ofType<SetDepartmentsInfoFields>(
            EnumDepartmentActions.SetDepartmentsInfoFields,
        ),
        distinctUntilChanged(),
        map((action) => action.payload),
        withLatestFrom(this._store.pipe(select(selectVendorInfoFields))),
        switchMap(([field, fields]) => {
            const {
                essential_fields,
                additional_fields,
            }: DepartmentFields<
                DepartmentSetterModel,
                DepartmentSetterModel
            > = fields;

            const mutatedFields: DepartmentFields<
                DepartmentSetterModel,
                DepartmentSetterModel
            > = {
                essential_fields,
                additional_fields,
            };

            const mergedMutatedFields: DepartmentSetterModel[] = essential_fields.concat(
                additional_fields,
            );
            if (
                mergedMutatedFields.some(
                    (item: DepartmentSetterModel): boolean =>
                        item.name === field.regenerator.name,
                )
            ) {
                mutatedFields[field.sub_fields] = fields[field.sub_fields].map(
                    (item: DepartmentSetterModel): DepartmentSetterModel => {
                        if (item.name === field.regenerator.name) {
                            return field.regenerator;
                        } else {
                            return item;
                        }
                    },
                );
            }

            return of(
                new SetDepartmentsInfoFieldsSuccess({
                    info_fields: mutatedFields,
                }),
            );
        }),
    );

    @Effect()
    setCurrentDepartment$ = this._actions$.pipe(
        ofType<SetCurrentDepartment>(
            EnumDepartmentActions.SetCurrentDepartment,
        ),
        distinctUntilChanged(),
        map((action) => action.payload),
        switchMap((data: Department) => {
            return of(new SetCurrentDepartmentSuccess(data));
        }),
    );

    @Effect()
    removeCurrentDepartment$ = this._actions$.pipe(
        ofType<RemoveCurrentDepartment>(
            EnumDepartmentActions.RemoveCurrentDepartment,
        ),
        distinctUntilChanged(),
        switchMap(
            (): Observable<RemoveCurrentDepartmentSuccess> => {
                return of(new RemoveCurrentDepartmentSuccess());
            },
        ),
    );
}
