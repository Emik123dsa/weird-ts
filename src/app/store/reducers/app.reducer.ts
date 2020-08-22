import { configReducer } from "./config.reducer";
import { departmentReducer } from "./department.reducer";
import { routerReducer } from "@ngrx/router-store";
import { initialAppState, AppState } from "../state/app.state";
import { ActionReducerMap } from "@ngrx/store";

export const appReducer: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  config: configReducer,
  vendor: departmentReducer
}