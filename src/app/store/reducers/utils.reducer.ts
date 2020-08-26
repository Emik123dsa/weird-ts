import { EnumUtils, UtilsActions } from '../actions/utils.action';
import { initialUtilsState, UtilsState } from '../state/utils.state';
import { DropDownModel, ModalModel } from '../../core/models';
export const utilsReducer = (
    state = initialUtilsState,
    action: UtilsActions,
): UtilsState => {
    switch (action.type) {
        case EnumUtils.GetDropDownSuccess:
            return {
                ...state,
                dropDown: action.payload as DropDownModel,
            };
        case EnumUtils.GetModalSuccess:
            return {
                ...state,
                modal: action.payload as ModalModel,
            };
        default:
            return state;
    }
};
