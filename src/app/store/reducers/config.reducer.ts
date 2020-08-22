
import { EnumConfig, ConfigAction } from "../actions/config.action";
import { ConfigState, initialConfigState } from "../state/config.state";

export const configReducer = (
  state = initialConfigState,
  action: ConfigAction
): ConfigState => {
  switch (action.type) {
    case EnumConfig.GetConfigSuccess:
      return {
        ...state,
        REST_API_SCHEMA: action.payload
      }

    default:
      return state;
  }
}