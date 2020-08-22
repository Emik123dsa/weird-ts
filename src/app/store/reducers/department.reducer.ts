import { EnumDepartmentActions, DepartmentActions } from "../actions/department.action";
import { initialDepartmentState, DepartmentState } from "../state/department.state";

export const departmentReducer = (
  state = initialDepartmentState,
  action: DepartmentActions
): DepartmentState => {
  switch (action.type) {
    case EnumDepartmentActions.GetDepartmentsSuccess:
      return {
        ...state,
        departments: action.payload
      }
    case EnumDepartmentActions.GetDepartmentSuccess:
      return { ...state, currentDepartment: action.payload }
    default:
      return state;
  }
}