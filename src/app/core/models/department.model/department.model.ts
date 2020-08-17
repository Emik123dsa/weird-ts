import { DepartmentAccurate } from "./department.accurate.model";

export interface Department {
  id: number | Date,
  photo_vendor: string,
  activated?: boolean,
  desc?: DepartmentAccurate
}