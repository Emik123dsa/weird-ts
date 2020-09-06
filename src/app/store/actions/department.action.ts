import { DepartmentState } from './../state/department.state';
import { DepartmentFields } from './../../core/models/department.model/department.fields.model';
import { Action } from '@ngrx/store';
import { Department, DepartmentSetterModel } from '../../core/models';

export type DepartmentFieldsModel = 'info_fields' | 'contact_person_fields';
export type DepartmentSubFieldsModel = 'essential_fields' | 'additional_fields';
/**
 * Set Departments Fields Model
 *
 * @export
 * @interface SetDepartmentsFieldsModel
 */
export interface SetDepartmentsFieldsModel {
    fields?: DepartmentFieldsModel;
    sub_fields?: DepartmentSubFieldsModel;
    mutated_fields: DepartmentSetterModel;
}
/**
 * Set Department Field Model
 *
 * @export
 * @interface SetDepartmentFieldModel
 */
export interface SetDepartmentFieldsModel {
    id?: string | number | never;
    fields?: DepartmentFieldsModel;
    sub_fields?: DepartmentSubFieldsModel;
    mutated_fields?: DepartmentSetterModel;
}

export type DepartmentsContactPersonsModelSuccess = DepartmentFields<
    DepartmentSetterModel,
    DepartmentSetterModel
>;
export type DepartmentsInfoModelSuccess = DepartmentFields<
    DepartmentSetterModel,
    DepartmentSetterModel
>;
/**
 * Enum for ngrx Department
 *
 * @export
 * @enum {number}
 */
export enum EnumDepartmentActions {
    GetDepartments = '[Department] Get Departments',
    GetDepartmentsSuccess = '[Departments] Get Departments Success',
    GetDepartment = '[Department] Get Department',
    GetDepartmentSuccess = '[Department] Get Department Success',
    /**
     * SINGLE IMPLEMENTATION FOR DEPARTMENT | CHANGE EMIITER
     */
    AddCurrentDepartmentAdditionalFields = '[Department] Add Current Deparmtnet Additional Fields',
    AddCurrentDepartmentAdditionalFieldsSuccess = '[Department] Add Current Deparmtnet Additional Fields Success',
    RemoveCurrentDepartmentAdditionalFields = '[Department] Remove Current Deparmtnet Additional Fields',
    RemoveCurrentDepartmentAdditionalFieldsSuccess = '[Department] Remove Current Deparmtnet AdditionalFields Success',
    /**
     * MULTIPLY IMPLEMENTATION FOR DEPARTMENTS | CREATE EMITTER
     */
    SetDepartmentsInfoFields = '[Departments] Set Departments Info Fields',
    SetDepartmentsInfoFieldsSuccess = '[Departments] Set Departments Info Fields Success',
    SetDepartmentsContactPersonsFields = '[Departments] Set Departments Contact persons Fields',
    SetDepartmentsContactPersonsFieldsSuccess = '[Departments] Set Departments Contact persons Fields Success',
    /**
     * REMOVE DEPARTMENT FROM STORE | SERVICE
     */
    DemolishDepartment = '[Department] Demolish Department From Store',
    AddDepartment = '[Department] Add Department',

    DemolishDepartmentSuccess = '[Department] Demolish Department From Store Success',
    AddDepartmentSuccess = '[Department] Add Department Success',

    /**
     * Additional Fields Features
     */
    DemolishAdditionalFields = '[Department] Demolish Department Fields',
    DemolishAdditionalFieldsSuccess = '[Department] Demolish Department Fields Success',

    AddAdditionalFields = '[Department] Add Department Fields',
    AddAdditionalFieldsSuccess = '[Department] Add Department Fields Success',

    /**
     * Features for Current department
     */
    RemoveCurrentDepartmentSuccess = '[Department] Remove Current Department Success',
    RemoveCurrentDepartment = '[Department] Remove Current Department',
    SetCurrentDepartmentSuccess = '[Department] Set Current Department Success',
    SetCurrentDepartment = '[Department] Set Current Department',

    AlterCurrentDepartment = '[Department] Alter Current Department',
    AlterCurrentDepartmentSuccess = '[Department] Alter Current Department Success',
}
/**
 * Getter for DepartmentsSuccess
 *
 * @export
 * @class GetDepartments
 * @implements {Action}
 */
export class GetDepartments implements Action {
    public readonly type = EnumDepartmentActions.GetDepartments;
}
/**
 * Getter for DepartmentsSuccess
 *
 * @export
 * @class GetDepartmentsSuccess
 * @implements {Action}
 */
export class GetDepartmentsSuccess implements Action {
    public readonly type = EnumDepartmentActions.GetDepartmentsSuccess;
    constructor(public payload: Department[]) {}
}
/**
 * Getter for Department
 *
 * @export
 * @class GetDepartment
 * @implements {Action}
 */
export class GetDepartment implements Action {
    public readonly type = EnumDepartmentActions.GetDepartment;
    constructor(public payload: string) {}
}
/**
 * Getter for DepartmentSuccess
 *
 * @export
 * @class GetDepartmentSuccess
 * @implements {Action}
 */
export class GetDepartmentSuccess implements Action {
    public readonly type = EnumDepartmentActions.GetDepartmentSuccess;
    constructor(public payload: Department) {}
}

/**
 * Info fields for departments create
 *
 * @export
 * @class SetDepartmentsInfoFields
 * @implements {Action}
 */
export class SetDepartmentsInfoFields implements Action {
    public readonly type = EnumDepartmentActions.SetDepartmentsInfoFields;
    constructor(public payload: SetDepartmentsFieldsModel) {}
}
/**
 * Info fields for department change
 *
 * @export
 * @class SetDepartmentInfoFields
 * @implements {Action}
 */
export class AddCurrentDepartmentAdditionalFields implements Action {
    public readonly type =
        EnumDepartmentActions.AddCurrentDepartmentAdditionalFields;
    constructor(public payload: SetDepartmentFieldsModel) {}
}
/**
 * Contact persons fields for departments create
 *
 * @export
 * @class SetDepartmentsInfoFields
 * @implements {Action}
 */
export class SetDepartmentsContactPersonsFields implements Action {
    public readonly type =
        EnumDepartmentActions.SetDepartmentsContactPersonsFields;
    constructor(public payload: SetDepartmentsFieldsModel) {}
}
/**
 * Cotnact persons fields for department change
 *
 * @export
 * @class SetDepartmentInfoFields
 * @implements {Action}
 */
export class RemoveCurrentDepartmentAdditionalFields implements Action {
    public readonly type =
        EnumDepartmentActions.RemoveCurrentDepartmentAdditionalFields;
    constructor(public payload: SetDepartmentFieldsModel) {}
}

/**
 * Info fields for departments create
 *
 * @export
 * @class SetDepartmentsInfoFields
 * @implements {Action}
 */
export class SetDepartmentsInfoFieldsSuccess implements Action {
    public readonly type =
        EnumDepartmentActions.SetDepartmentsInfoFieldsSuccess;
    constructor(
        public payload: DepartmentFields<
            DepartmentSetterModel,
            DepartmentSetterModel
        >,
    ) {}
}
/**
 * Info fields for department change
 *
 * @export
 * @class SetDepartmentInfoFields
 * @implements {Action}
 */
export class AddCurrentDepartmentAdditionalFieldsSuccess implements Action {
    public readonly type =
        EnumDepartmentActions.AddCurrentDepartmentAdditionalFieldsSuccess;
    constructor(public payload: any) {}
}
/**
 * Contact persons fields for departments create
 *
 * @export
 * @class SetDepartmentsInfoFields
 * @implements {Action}
 */
export class SetDepartmentsContactPersonsFieldsSuccess implements Action {
    public readonly type =
        EnumDepartmentActions.SetDepartmentsContactPersonsFieldsSuccess;
    constructor(public payload: DepartmentsContactPersonsModelSuccess) {}
}
/**
 * Cotnact persons fields for department change
 *
 * @export
 * @class SetDepartmentInfoFields
 * @implements {Action}
 */
export class RemoveCurrentDepartmentAdditionalFieldsSuccess implements Action {
    public readonly type =
        EnumDepartmentActions.RemoveCurrentDepartmentAdditionalFieldsSuccess;
    constructor(public payload: any) {}
}

export class SetCurrentDepartment implements Action {
    public readonly type = EnumDepartmentActions.SetCurrentDepartment;
    constructor(public payload: Department) {}
}

export class RemoveCurrentDepartment implements Action {
    public readonly type = EnumDepartmentActions.RemoveCurrentDepartment;
}

export class SetCurrentDepartmentSuccess implements Action {
    public readonly type = EnumDepartmentActions.SetCurrentDepartmentSuccess;
    constructor(public payload: Department) {}
}

export class RemoveCurrentDepartmentSuccess implements Action {
    public readonly type = EnumDepartmentActions.RemoveCurrentDepartmentSuccess;
}

export class DemolishDepartment implements Action {
    public readonly type = EnumDepartmentActions.DemolishDepartment;
    constructor(public payload: Department) {}
}

export class DemolishDepartmentSuccess implements Action {
    public readonly type = EnumDepartmentActions.DemolishDepartmentSuccess;
    constructor(public payload: Department[]) {}
}

export class AddDepartment implements Action {
    public readonly type = EnumDepartmentActions.AddDepartment;
    constructor(public payload: Department) {}
}

export class AddDepartmentSuccess implements Action {
    public readonly type = EnumDepartmentActions.AddDepartmentSuccess;
    constructor(public payload: Department[]) {}
}

export class AlterCurrentDepartment implements Action {
    public readonly type = EnumDepartmentActions.AlterCurrentDepartment;
    constructor(public payload: Department) {}
}

export class AlterCurrentDepartmentSuccess implements Action {
    public readonly type = EnumDepartmentActions.AlterCurrentDepartmentSuccess;
    constructor(public payload: Department[]) {}
}

export class AddAdditionalFields implements Action {
    public readonly type = EnumDepartmentActions.AddAdditionalFields;
    constructor(public payload: SetDepartmentFieldsModel) {}
}

export class AddAdditionalFieldsSuccess implements Action {
    public readonly type = EnumDepartmentActions.AddAdditionalFieldsSuccess;
    constructor(public payload: Omit<DepartmentState, 'currentDepartment'>) {}
}

export class DemolishAdditionalFields implements Action {
    public readonly type = EnumDepartmentActions.DemolishAdditionalFields;
    constructor(public payload: SetDepartmentFieldsModel) {}
}

export class DemolishAdditionalFieldsSuccess implements Action {
    public readonly type =
        EnumDepartmentActions.DemolishAdditionalFieldsSuccess;
    constructor(public payload: Omit<DepartmentState, 'currentDepartment'>) {}
}

export type DepartmentActions =
    | GetDepartment
    | GetDepartments
    | GetDepartmentSuccess
    | GetDepartmentsSuccess
    | AddCurrentDepartmentAdditionalFields
    | AddCurrentDepartmentAdditionalFieldsSuccess
    | SetDepartmentsContactPersonsFields
    | SetDepartmentsContactPersonsFieldsSuccess
    | RemoveCurrentDepartmentAdditionalFields
    | RemoveCurrentDepartmentAdditionalFields
    | SetDepartmentsInfoFields
    | SetDepartmentsInfoFieldsSuccess
    | SetCurrentDepartment
    | SetCurrentDepartmentSuccess
    | RemoveCurrentDepartment
    | RemoveCurrentDepartmentSuccess
    | DemolishDepartment
    | DemolishDepartmentSuccess
    | AddDepartment
    | AddDepartmentSuccess
    | AlterCurrentDepartment
    | AlterCurrentDepartmentSuccess
    | AddAdditionalFields
    | AddAdditionalFieldsSuccess
    | DemolishAdditionalFields
    | DemolishAdditionalFieldsSuccess;
