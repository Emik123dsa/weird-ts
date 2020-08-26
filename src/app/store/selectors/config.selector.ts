import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { ConfigState } from '../state/config.state';

const configSelector = (state: AppState) => state.config;

export const selectConfig = createSelector(
    configSelector,
    (state: ConfigState) => state.REST_API_SCHEMA,
);
