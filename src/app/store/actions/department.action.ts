import { Action } from "@ngrx/store";
import { Department, DepartmentAccurate } from "../../core/models";

export enum EnumDepartmentActions {
  GetDepartments = '[Department] Get Departments',
  GetDepartmentsSuccess = '[Department] Get Departments Success',
  GetDepartment = '[Department] Get Department',
  GetDepartmentSuccess = '[Department] Get Department Success'
}

export class GetDepartments implements Action {
  public readonly type = EnumDepartmentActions.GetDepartments
}

export class GetDepartmentsSuccess implements Action {
  public readonly type = EnumDepartmentActions.GetDepartmentsSuccess;
  constructor(public payload: Department<DepartmentAccurate>[]) { }
}

export class GetDepartment implements Action {
  public readonly type = EnumDepartmentActions.GetDepartment
  constructor(public payload: string) { }
}

export class GetDepartmentSuccess implements Action {
  public readonly type = EnumDepartmentActions.GetDepartmentSuccess
  constructor(public payload: Department<DepartmentAccurate>) { }
}

export type DepartmentActions = GetDepartment | GetDepartments | GetDepartmentSuccess | GetDepartmentsSuccess;
