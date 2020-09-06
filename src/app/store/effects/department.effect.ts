import { selectDepartments } from './../selectors/department.selector';
import {
    DepartmentFields,
    DepartmentSetterModel,
} from './../../core/models/department.model/department.fields.model';

import {
    SetDepartmentsContactPersonsFields,
    SetDepartmentsInfoFields,
    SetDepartmentsContactPersonsFieldsSuccess,
    SetDepartmentsInfoFieldsSuccess,
    SetCurrentDepartment,
    SetCurrentDepartmentSuccess,
    RemoveCurrentDepartment,
    RemoveCurrentDepartmentSuccess,
    DemolishDepartment,
    DemolishDepartmentSuccess,
    AddDepartment,
    AddDepartmentSuccess,
    AlterCurrentDepartment,
    AlterCurrentDepartmentSuccess,
    SetDepartmentsFieldsModel,
    AddAdditionalFields,
    AddAdditionalFieldsSuccess,
    DepartmentFieldsModel,
    DemolishAdditionalFields,
    DemolishAdditionalFieldsSuccess,
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
            let currentField!: DepartmentSetterModel[];

            const immutableField: string | number | symbol = Reflect.ownKeys(
                fields,
            ).find(
                (
                    data: keyof DepartmentFields<
                        DepartmentSetterModel,
                        DepartmentSetterModel
                    >,
                ) => data !== field.sub_fields && data,
            );

            currentField = fields[field.sub_fields].map(
                (item: DepartmentSetterModel) => {
                    if (item.name === field.mutated_fields.name) {
                        return field.mutated_fields;
                    } else {
                        return item;
                    }
                },
            );

            const personsFields: DepartmentFields<
                DepartmentSetterModel,
                DepartmentSetterModel
            > = {
                [immutableField]: fields[immutableField],
                [field.sub_fields]: currentField,
            };

            return of(
                new SetDepartmentsContactPersonsFieldsSuccess(personsFields),
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
            let currentField!: DepartmentSetterModel[];

            const immutableField: string | number | symbol = Reflect.ownKeys(
                fields,
            ).find(
                (
                    data: keyof DepartmentFields<
                        DepartmentSetterModel,
                        DepartmentSetterModel
                    >,
                ) => data !== field.sub_fields && data,
            );

            currentField = fields[field.sub_fields].map(
                (item: DepartmentSetterModel) => {
                    if (item.name === field.mutated_fields.name) {
                        return field.mutated_fields;
                    } else {
                        return item;
                    }
                },
            );

            const infoFields: DepartmentFields<
                DepartmentSetterModel,
                DepartmentSetterModel
            > = {
                [immutableField]: fields[immutableField],
                [field.sub_fields]: currentField,
            };

            return of(new SetDepartmentsInfoFieldsSuccess(infoFields));
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

    @Effect()
    demolishDepartment$ = this._actions$.pipe(
        ofType<DemolishDepartment>(EnumDepartmentActions.DemolishDepartment),
        map((data) => data.payload),
        distinctUntilChanged(),
        withLatestFrom(this._store.pipe(select(selectDepartmentsList))),
        switchMap(
            ([department, departments]): Observable<
                DemolishDepartmentSuccess
            > => {
                return of(
                    new DemolishDepartmentSuccess(
                        departments.filter((data) => data.id !== department.id),
                    ),
                );
            },
        ),
    );

    @Effect()
    addDepartment$ = this._actions$.pipe(
        ofType<AddDepartment>(EnumDepartmentActions.AddDepartment),
        map((data) => data.payload),
        withLatestFrom(this._store.pipe(select(selectDepartmentsList))),
        switchMap(
            ([department, departments]): Observable<AddDepartmentSuccess> => {
                let departmentsList: Department[] = [];

                if (
                    !departments.some(
                        (data: Department) => data.id === department.id,
                    )
                ) {
                    departmentsList = departments.concat(department);
                } else {
                    departmentsList = departments;
                }

                return of(new AddDepartmentSuccess(departmentsList));
            },
        ),
    );

    @Effect()
    alterCurrentDepartment$ = this._actions$.pipe(
        ofType<AlterCurrentDepartment>(
            EnumDepartmentActions.AlterCurrentDepartment,
        ),
        map((data) => data.payload),
        withLatestFrom(this._store.pipe(select(selectDepartmentsList))),
        switchMap(
            ([department, departments]): Observable<
                AlterCurrentDepartmentSuccess
            > => {
                const mutatedDepartments: Department[] = departments.map(
                    (field: Department) => {
                        if (department.id === field.id) {
                            return department;
                        } else {
                            return field;
                        }
                    },
                );
                return of(
                    new AlterCurrentDepartmentSuccess(mutatedDepartments),
                );
            },
        ),
    );

    @Effect()
    addAdditionalFields$ = this._actions$.pipe(
        ofType<AddAdditionalFields>(EnumDepartmentActions.AddAdditionalFields),
        map((action) => action.payload),
        withLatestFrom(this._store.pipe(select(selectDepartments))),
        switchMap(
            ([field, fields]): Observable<AddAdditionalFieldsSuccess> => {
                const departments: Department[] = [] as Department[];

                let vendorDepartmentFields: DepartmentFields<
                    DepartmentSetterModel,
                    DepartmentSetterModel
                > =
                    fields.vendorFields[
                        field.fields as keyof DepartmentFieldsModel
                    ];
                const departmentFields: DepartmentSetterModel[] = vendorDepartmentFields.additional_fields.concat(
                    vendorDepartmentFields.essential_fields,
                );

                if (
                    !departmentFields.some(
                        (item: DepartmentSetterModel) =>
                            item.name === field.mutated_fields.name,
                    )
                ) {
                    vendorDepartmentFields = {
                        essential_fields:
                            vendorDepartmentFields.essential_fields,
                        additional_fields: vendorDepartmentFields.additional_fields.concat(
                            field.mutated_fields,
                        ),
                    };
                }

                if (
                    Array.isArray(fields.departments) &&
                    fields.departments.length > 0
                ) {
                    if (!field.id) {
                        fields.departments.reduce(
                            (
                                acc: Department | undefined,
                                data: Department,
                                index: string | symbol | number,
                            ) => {
                                Reflect.ownKeys(data).forEach(
                                    (sub_data: keyof Department) => {
                                        if (
                                            sub_data &&
                                            sub_data === field.fields
                                        ) {
                                            acc = {
                                                ...acc,
                                                [sub_data]: {
                                                    essential_fields:
                                                        data[sub_data]
                                                            .essential_fields,
                                                    additional_fields: data[
                                                        sub_data
                                                    ].additional_fields.concat(
                                                        field.mutated_fields,
                                                    ),
                                                } as DepartmentFields<
                                                    DepartmentSetterModel,
                                                    DepartmentSetterModel
                                                >,
                                            };
                                        } else {
                                            acc = {
                                                ...acc,
                                                [sub_data]: data[sub_data],
                                            };
                                        }
                                    },
                                );
                                departments[index] = acc;
                                return acc;
                            },
                            {} as Department,
                        );
                    } else {
                        if (
                            fields.departments.some(
                                (item: Department) => item.id === field.id,
                            )
                        ) {
                            fields.departments.forEach(
                                (
                                    item: Department,
                                    index: string | number | symbol,
                                ) => {
                                    if (item.id === field.id) {
                                        departments[index] = {
                                            ...item,
                                            [field.fields as keyof DepartmentFieldsModel]: {
                                                essential_fields:
                                                    item[
                                                        field.fields as keyof DepartmentFieldsModel
                                                    ].essential_fields,
                                                additional_fields: item[
                                                    field.fields as keyof DepartmentFieldsModel
                                                ].additional_fields.concat(
                                                    field.mutated_fields,
                                                ),
                                            },
                                        };
                                    } else {
                                        departments[index] = item;
                                    }
                                },
                            );
                        }
                    }
                }
                return of(
                    new AddAdditionalFieldsSuccess({
                        departments,
                        vendorFields: !field.id
                            ? {
                                  ...fields.vendorFields,
                                  [field.fields as keyof DepartmentFieldsModel]: vendorDepartmentFields,
                              }
                            : fields.vendorFields,
                    }),
                );
            },
        ),
    );

    @Effect()
    demolishAdditionalFields$ = this._actions$.pipe(
        ofType<DemolishAdditionalFields>(
            EnumDepartmentActions.DemolishAdditionalFields,
        ),
        map((data) => data.payload),
        withLatestFrom(this._store.pipe(select(selectDepartments))),
        switchMap(
            ([department, departments]): Observable<
                DemolishAdditionalFieldsSuccess
            > => {
                const additionalDepartments: Department[] = [] as Department[];

                let vendorAdditionalFields: DepartmentFields<
                    DepartmentSetterModel,
                    DepartmentSetterModel
                > =
                    departments.vendorFields[
                        department.fields as keyof DepartmentFieldsModel
                    ];

                if (
                    vendorAdditionalFields.additional_fields.some(
                        (data: DepartmentSetterModel) =>
                            data.name === department.mutated_fields.key,
                    )
                ) {
                    vendorAdditionalFields = {
                        essential_fields:
                            vendorAdditionalFields.essential_fields,
                        additional_fields: vendorAdditionalFields.additional_fields.filter(
                            (data: DepartmentSetterModel) =>
                                data.name !== department.mutated_fields.key,
                        ),
                    };
                }

                if (!!department.id) {
                    if (
                        departments.departments.some(
                            (item: Department) => item.id === department.id,
                        )
                    ) {
                        departments.departments.forEach(
                            (
                                item: Department,
                                index: string | number | symbol,
                            ) => {
                                if (item.id === department.id) {
                                    additionalDepartments[index] = {
                                        ...item,
                                        [department.fields as keyof DepartmentFieldsModel]: {
                                            essential_fields:
                                                item[
                                                    department.fields as keyof DepartmentFieldsModel
                                                ].essential_fields,
                                            additional_fields: item[
                                                department.fields as keyof DepartmentFieldsModel
                                            ].additional_fields.filter(
                                                (data: DepartmentSetterModel) =>
                                                    data.name !==
                                                    department.mutated_fields
                                                        .key,
                                            ),
                                        },
                                    };
                                } else {
                                    additionalDepartments[index] = item;
                                }
                            },
                        );
                    }
                }

                return of(
                    new DemolishAdditionalFieldsSuccess({
                        departments: additionalDepartments,
                        vendorFields: !department.id
                            ? {
                                  ...departments.vendorFields,
                                  [department.fields as keyof DepartmentFieldsModel]: vendorAdditionalFields,
                              }
                            : departments.vendorFields,
                    }),
                );
            },
        ),
    );
}
