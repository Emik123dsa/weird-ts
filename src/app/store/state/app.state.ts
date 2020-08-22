import { RouterReducerState } from "@ngrx/router-store";

import { DepartmentState, initialDepartmentState } from "./department.state";
import { ConfigState, initialConfigState } from "./config.state";

export interface AppState {
  router?: RouterReducerState;
  config: ConfigState;
  vendor: DepartmentState;
}

export const initialAppState: AppState = {
  config: initialConfigState,
  vendor: initialDepartmentState
}

export function getInitialState(): AppState {
  return initialAppState;
}

