import { Department, DepartmentAccurate } from "../../core/models";
/**
 * DepartmentState
 *
 * @export
 * @interface DepartmentState
 */
export interface DepartmentState {
  departments: Department<DepartmentAccurate>[],
  currentDepartment: Department<DepartmentAccurate>
}

export const initialDepartmentState: DepartmentState = {
  departments: [{
    id: 123,
    department_name: "Cardiology",
    photo_vendor: "123",
    activated: true,
    desc: {} as DepartmentAccurate
  },
  {
    id: 123,
    department_name: "Mammology",
    photo_vendor: "123",
    activated: true,
    desc: {} as DepartmentAccurate
  }] as Department<DepartmentAccurate>[],
  currentDepartment: {} as Department<DepartmentAccurate>
}