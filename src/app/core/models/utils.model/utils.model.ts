export interface DropDownModel {
  activated: boolean,
  id: number
}

export interface ModalModel {
  activated: boolean,
  id: number
}

export interface UtilsModel {
  dropdown: DropDownModel,
  modal: ModalModel
}