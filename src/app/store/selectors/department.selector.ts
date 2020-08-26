import { createSelector } from '@ngrx/store';
import { DepartmentState } from '../state/department.state';
import { AppState } from '../state/app.state';
import { DepartmentFields } from '../../core';

const selectDepartments = (state: AppState) => state.vendor;

export const selectDepartmentsList = createSelector(
    selectDepartments,
    (state: DepartmentState) => state.departments,
);

export const selectDepartment = createSelector(
    selectDepartments,
    (state: DepartmentState) => state.currentDepartment,
);

export const selectVendorFields = createSelector(
    selectDepartments,
    (state: DepartmentState) => state.vendorFields,
);

export const selectVendorInfoFields = createSelector(
    selectDepartments,
    (state: DepartmentState) => state.vendorFields.info_fields,
);

export const selectVendorContactPersonsFields = createSelector(
    selectDepartments,
    (state: DepartmentState) => state.vendorFields.contact_person_fields,
);
