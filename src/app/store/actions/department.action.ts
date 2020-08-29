import { DepartmentFields } from './../../core/models/department.model/department.fields.model';
import { Action } from '@ngrx/store';
import { Department, DepartmentSetterModel } from '../../core/models';

export type DepartmentFieldsModel = 'info_fields' | 'contact_person_fields';
export type DepartmentSubFieldsModel = 'essential_fields' | 'additional_fields';
/**
 * Set Department Fields Model
 *
 * @export
 * @interface SetDepartmentFieldsModel
 */
export interface SetDepartmentFieldsModel {
    id: number;
    fields: DepartmentFieldsModel;
    sub_fields: DepartmentSubFieldsModel;
    regenerator: DepartmentSetterModel;
}

export type DepartmentsContactPersonsModelSuccess = Pick<
    Department,
    'contact_person_fields'
>;
export type DepartmentsInfoModelSuccess = Pick<Department, 'info_fields'>;

export type SetDepartmentsFieldsModel = Omit<SetDepartmentFieldsModel, 'id'>;
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
    SetDepartmentInfoFields = '[Department] Set Department Info Fields',
    SetDepartmentInfoFieldsSuccess = '[Department] Set Department Info Fields Success',
    SetDepartmentContactPersonsFields = '[Department] Set Department Contact persons Fields',
    SetDepartmentContactPersonsFieldsSuccess = '[Department] Set Department Contact persons Fields Success',
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
    
    DemolishAdditionalFields = '[Department] Demolish Department Fields',

    RemoveCurrentDepartmentSuccess = '[Department] Remove Current Department Success',
    RemoveCurrentDepartment = '[Department] Remove Current Department',
    SetCurrentDepartmentSuccess = '[Department] Set Current Department Success',

    SetCurrentDepartment = '[Department] Set Current Department',
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
export class SetDepartmentInfoFields implements Action {
    public readonly type = EnumDepartmentActions.SetDepartmentInfoFields;
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
export class SetDepartmentContactPersonsFields implements Action {
    public readonly type =
        EnumDepartmentActions.SetDepartmentContactPersonsFields;
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
    constructor(public payload: DepartmentsInfoModelSuccess) {}
}
/**
 * Info fields for department change
 *
 * @export
 * @class SetDepartmentInfoFields
 * @implements {Action}
 */
export class SetDepartmentInfoFieldsSuccess implements Action {
    public readonly type = EnumDepartmentActions.SetDepartmentInfoFieldsSuccess;
    constructor(public payload: SetDepartmentFieldsModel) {}
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
export class SetDepartmentContactPersonsFieldsSuccess implements Action {
    public readonly type =
        EnumDepartmentActions.SetDepartmentContactPersonsFieldsSuccess;
    constructor(public payload: SetDepartmentFieldsModel) {}
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

export type DepartmentActions =
    | GetDepartment
    | GetDepartments
    | GetDepartmentSuccess
    | GetDepartmentsSuccess
    | SetDepartmentContactPersonsFields
    | SetDepartmentContactPersonsFieldsSuccess
    | SetDepartmentsContactPersonsFields
    | SetDepartmentsContactPersonsFieldsSuccess
    | SetDepartmentInfoFields
    | SetDepartmentInfoFieldsSuccess
    | SetDepartmentsInfoFields
    | SetDepartmentsInfoFieldsSuccess
    | SetCurrentDepartment
    | SetCurrentDepartmentSuccess
    | RemoveCurrentDepartment
    | RemoveCurrentDepartmentSuccess
    | DemolishDepartment
    | DemolishDepartmentSuccess
    | AddDepartment
    | AddDepartmentSuccess;
