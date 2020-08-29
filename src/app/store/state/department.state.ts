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
    departments: [
        {
            id: 1,
            department_name: 'Cardiology',
            photo_vendor: '123',
            activated: true,
            info_fields: {
                essential_fields: [
                    {
                        key: 'api',
                        value: 'hello',
                        name: 'api',
                    },
                    {
                        key: 'how are you',
                        value: 'hello',
                    },
                    {
                        key: 'getting on',
                        value: 'hello',
                    },
                ],
                additional_fields: [],
            },
            contact_person_fields: {
                essential_fields: [
                    {
                        key: 'vova',
                        value: 'hello',
                    },
                ],
                additional_fields: [{}],
            },
        },
        {
            id: 2,
            department_name: 'Mammology',
            photo_vendor: '123',
            activated: true,
            info_fields: {
                essential_fields: [
                    {
                        key: 'vova',
                        value: 'hello',
                    },
                ],
                additional_fields: [{}],
            },
            contact_person_fields: {
                essential_fields: [
                    {
                        key: 'vova',
                        value: 'hello',
                    },
                ],
                additional_fields: [{}],
            },
        },
        {
            id: 3,
            department_name: 'Cardiology',
            photo_vendor: '123',
            activated: true,
            info_fields: {
                essential_fields: [
                    {
                        key: 'api',
                        value: 'hello',
                        name: 'api',
                    },
                    {
                        key: 'how are you',
                        value: 'hello',
                    },
                    {
                        key: 'getting on',
                        value: 'hello',
                    },
                ],
                additional_fields: [],
            },
            contact_person_fields: {
                essential_fields: [
                    {
                        key: 'vova',
                        value: 'hello',
                    },
                ],
                additional_fields: [{}],
            },
        },
    ] as Department[],
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
