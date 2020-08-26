import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UtilsState } from '../state/utils.state';

const selectUtils = (state: AppState) => state.utils;

export const selectModals = createSelector(
    selectUtils,
    (state: UtilsState) => state.modal,
);

export const selectDropDown = createSelector(
    selectUtils,
    (state: UtilsState) => state.dropDown,
);
