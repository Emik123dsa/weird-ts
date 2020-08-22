import { DepartmentAccurate } from "./department.accurate.model";

export interface Department<T> {
  id: number | Date;
  department_name: string;
  photo_vendor: string;
  activated: boolean;
  desc?: T;
}