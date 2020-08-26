import { UtilsModel, DropDownModel, ModalModel } from '../../core/models/index';

export interface UtilsState {
    dropDown: DropDownModel;
    modal: ModalModel;
}

export const initialUtilsState: UtilsState = {
    dropDown: {
        activated: false as boolean,
        id: 0 as number,
    } as DropDownModel,
    modal: {
        activated: false as boolean,
        id: 0 as number,
    } as ModalModel,
};
