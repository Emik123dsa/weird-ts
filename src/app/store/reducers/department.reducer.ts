import { Department } from './../../core/models/department.model/department.model';
import { DepartmentFieldsModel } from './../actions/department.action';
import {
    DepartmentSetterModel,
    DepartmentFields,
} from './../../core/models/department.model/department.fields.model';
import {
    EnumDepartmentActions,
    DepartmentActions,
} from '../actions/department.action';
import {
    initialDepartmentState,
    DepartmentState,
} from '../state/department.state';

export const departmentReducer = (
    state = initialDepartmentState,
    action: DepartmentActions,
): DepartmentState => {
    switch (action.type) {
        case EnumDepartmentActions.GetDepartmentsSuccess:
            return {
                ...state,

                departments: action.payload,
            };
        case EnumDepartmentActions.GetDepartmentSuccess:
            return { ...state, currentDepartment: action.payload };

        case EnumDepartmentActions.SetDepartmentsContactPersonsFieldsSuccess:
            return {
                ...state,
                vendorFields: {
                    info_fields: state.vendorFields.info_fields,
                    contact_person_fields: action.payload.contact_person_fields,
                },
            };
        case EnumDepartmentActions.SetDepartmentsInfoFieldsSuccess:
            return {
                ...state,
                vendorFields: {
                    info_fields: action.payload.info_fields,
                    contact_person_fields:
                        state.vendorFields.contact_person_fields,
                },
            };
        case EnumDepartmentActions.SetDepartmentContactPersonsFieldsSuccess:
            return state;
        case EnumDepartmentActions.SetDepartmentInfoFieldsSuccess:
            return state;
        case EnumDepartmentActions.SetCurrentDepartmentSuccess:
            return { ...state, currentDepartment: action.payload };
        case EnumDepartmentActions.RemoveCurrentDepartmentSuccess:
            return {
                ...state,
                currentDepartment: {} as Department,
            };
        default:
            return state;
    }
};
