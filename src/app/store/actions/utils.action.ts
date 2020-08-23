import { DropDownModel, ModalModel } from "../../core/models";

import { Action } from "@ngrx/store";

export enum EnumUtils {
  GetDropDown = '[DropDown] Get Drop Down',
  GetDropDownSuccess = '[DropDown] Get Drop Down Success',
  GetModal = '[Modal] Get Modal',
  GetModalSuccess = '[Modal] Get Modal Success'
}

export class GetDropDown implements Action {
  public readonly type = EnumUtils.GetDropDown;
  public constructor(public payload: DropDownModel) { }
}

export class GetDropDownSuccess implements Action {
  public readonly type = EnumUtils.GetDropDownSuccess;
  public constructor(public payload: DropDownModel) { }
}

export class GetModal implements Action {
  public readonly type = EnumUtils.GetModal;
  public constructor(public payload: DropDownModel) { }
}

export class GetModalSuccess implements Action {
  public readonly type = EnumUtils.GetModalSuccess;
  public constructor(public payload: ModalModel) { }
}

export type UtilsActions = GetModal | GetModalSuccess | GetDropDown | GetDropDownSuccess;

