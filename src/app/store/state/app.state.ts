import { RouterReducerState } from '@ngrx/router-store';

import { DepartmentState, initialDepartmentState } from './department.state';
import { ConfigState, initialConfigState } from './config.state';

import { UtilsState, initialUtilsState } from './utils.state';

export interface AppState {
    router?: RouterReducerState;
    config: ConfigState;
    vendor: DepartmentState;
    utils: UtilsState;
}

export const initialAppState: AppState = {
    config: initialConfigState,
    vendor: initialDepartmentState,
    utils: initialUtilsState,
};

export function getInitialState(): AppState {
    return initialAppState;
}
