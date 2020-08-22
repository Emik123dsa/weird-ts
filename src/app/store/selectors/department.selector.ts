import { createSelector } from "@ngrx/store";
import { DepartmentState } from "../state/department.state";
import { AppState } from "../state/app.state";

const selectDepartments = (state: AppState) => state.vendor;

export const selectDepartmentsList = createSelector(
  selectDepartments,
  (state: DepartmentState) => state.departments
);

export const selectDepartment = createSelector(
  selectDepartments,
  (state: DepartmentState) => state.currentDepartment
);

