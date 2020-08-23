import { DepartmentFields, DepartmentSetterModel } from "./department.fields.model";

export interface Department {
  id: number;
  department_name: string;

  photo_vendor?: string;
  activated?: boolean;

  info_fields: DepartmentFields<DepartmentSetterModel, DepartmentSetterModel>;
  contact_person_fields: DepartmentFields<DepartmentSetterModel, DepartmentSetterModel>;
}