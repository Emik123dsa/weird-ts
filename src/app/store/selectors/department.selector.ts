import { Department } from './../../core/models/department.model/department.model';

import { createSelector } from '@ngrx/store';
import { DepartmentState } from '../state/department.state';
import { AppState } from '../state/app.state';
import { DepartmentFields } from '../../core';

export const selectDepartments = (state: AppState) => state.vendor;

export const selectDepartmentsList = createSelector(
    selectDepartments,
    (state: DepartmentState) => state.departments,
);

export const selectAlteredDepartment = (id: number) =>
    createSelector(selectDepartmentsList, (allItems: Department[]) => {
        return allItems
            ? allItems.find((data: Department) => data.id === id)
            : {};
    });

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
