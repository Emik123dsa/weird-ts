import { Department, DepartmentFields, DepartmentSetterModel } from "../../core/models";
export type FieldsPickModel = Pick<Department, "info_fields" | "contact_person_fields">;
export type OmittedSetter = Omit<DepartmentSetterModel, "value">;
/**
 * DepartmentState
 *
 * @export
 * @interface DepartmentState
 */
export interface DepartmentState {
  departments: Array<Department>;
  currentDepartment: Department;
  vendorFields: FieldsPickModel;
}

export const initialDepartmentState: DepartmentState = {
  departments: [{
    id: 1,
    department_name: "Cardiology",
    photo_vendor: "123",
    activated: true,
    info_fields: {
      essential_fields: [{
        key: "api",
        value: "hello"
      },
      {
        key: "how are you",
        value: "hello"
      },
      {
        key: "getting on",
        value: "hello"
      }
      ] as DepartmentSetterModel[],
      additional_fields: [{

      }] as DepartmentSetterModel[]
    },
    contact_person_fields: {
      essential_fields: [{
        key: "vova",
        value: "hello"
      }] as DepartmentSetterModel[],
      additional_fields: [{

      }] as DepartmentSetterModel[]
    }
  },
  {
    id: 2,
    department_name: "Mammology",
    photo_vendor: "123",
    activated: true,
    info_fields: {
      essential_fields: [{
        key: "vova",
        value: "hello"
      }] as DepartmentSetterModel[],
      additional_fields: [{

      }] as DepartmentSetterModel[]
    },
    contact_person_fields: {
      essential_fields: [{
        key: "vova",
        value: "hello"
      }] as DepartmentSetterModel[],
      additional_fields: [{

      }] as DepartmentSetterModel[]
    }
  }] as Department[],
  currentDepartment: {} as Department,
  vendorFields: {
    info_fields: {
      essential_fields: [{
        key: "api",
        value: "hello"
      },
      {
        key: "how are you",
        value: "hello"
      },
      {
        key: "getting on",
        value: "hello"
      }],
      additional_fields: [{
        key: "api",
        value: "hello"
      },
      {
        key: "how are you",
        value: "hello"
      },
      {
        key: "getting on",
        value: "hello"
      }]
    },
    contact_person_fields: {
      essential_fields: [{
        key: "api",
        value: "hello"
      },
      {
        key: "how are you",
        value: "hello"
      },
      {
        key: "getting on",
        value: "hello"
      }],
      additional_fields: [{
        key: "api",
        value: "hello"
      },
      {
        key: "how are you",
        value: "hello"
      },
      {
        key: "getting on",
        value: "hello"
      }]
    }
  }
}