import { ConfigModel } from "../../core/models";
/**
 * Config State
 *
 * @export
 * @interface ConfigState
 */
export interface ConfigState {
  REST_API_SCHEMA: ConfigModel
}

export const initialConfigState: ConfigState = {
  REST_API_SCHEMA: {
    apiHost: "" as string,
    bearer: "" as string,
    version: "" as string,
  } as ConfigModel
}