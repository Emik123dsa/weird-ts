import { Action } from "@ngrx/store"
import { ConfigModel } from '../../core';

export enum EnumConfig {
  GetConfig = '[Config] Get Config',
  GetConfigSuccess = '[Config] Get Config Success'
}

export class GetConfig implements Action {
  public readonly type = EnumConfig.GetConfig;
}

export class GetConfigSuccess implements Action {
  public readonly type = EnumConfig.GetConfigSuccess;
  constructor(public payload: ConfigModel) { }
}

export type ConfigAction = GetConfig | GetConfigSuccess;