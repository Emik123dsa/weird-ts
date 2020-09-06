export interface DropDownModel {
    activated: boolean;
    id: number;
}

export type TypeModal =
    | 'create'
    | 'delete'
    | 'change'
    | 'info_fields'
    | 'contact_person_fields'
    | 'delete|info_fields'
    | 'delete|contact_person_fields';

export interface ModalModel {
    activated: boolean;
    type: TypeModal;
    id: number;
    bind?: string;
}

export interface UtilsModel {
    dropdown: DropDownModel;
    modal: ModalModel;
}
