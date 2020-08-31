import {
    Department,
    DepartmentFields,
    DepartmentSetterModel,
} from '../../core/models';

export type FieldsPickModel = Pick<
    Department,
    'info_fields' | 'contact_person_fields'
>;
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
    departments: [],
    currentDepartment: {} as Department,
    vendorFields: {
        info_fields: {
            essential_fields: [
                {
                    key: 'Name',
                    value: '',
                    name: 'name',
                },
                {
                    key: 'API Token',
                    value: '',
                    name: 'apiToken',
                },
            ],
            additional_fields: [],
        },
        contact_person_fields: {
            essential_fields: [
                {
                    key: 'Name',
                    value: '',
                    name: 'name',
                },
                {
                    key: 'E-mail',
                    value: '',
                    name: 'eMail',
                },
                {
                    key: 'Telephone',
                    value: '',
                    name: 'telephone',
                },
            ],
            additional_fields: [],
        },
    },
};
