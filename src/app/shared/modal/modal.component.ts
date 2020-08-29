import { ModalModel } from './../../core/models/utils.model/utils.model';
import { Department } from './../../core/models/department.model/department.model';
import { selectDepartment } from './../../store/selectors/department.selector';
import { Component, Renderer2, OnInit, OnDestroy, Input } from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { selectModals } from '../../store/selectors/utils.selector';
import { AppState } from '../../store/state/app.state';
import { GetDropDown, GetModal } from '../../store/actions/utils.action';
import {
    RemoveCurrentDepartment,
    DemolishDepartment,
} from '../../store/actions/department.action';
@Component({
    selector: 'department-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export default class ModalComponent {
    public constructor(private readonly _store: Store<AppState>) {}
    @Input() modalContext!: Department;

    @Input() modalActivated!: ModalModel;

    public acceptDemolishDepartment() {
        this._store.dispatch(
            new GetDropDown({
                activated: !this.modalActivated.activated,
                id: null,
            }),
        );
        this._store.dispatch(
            new GetModal({
                activated: !this.modalActivated.activated,
                id: 0,
            }),
        );
        this._store.dispatch(new RemoveCurrentDepartment());
        this._store.dispatch(new DemolishDepartment(this.modalContext));
    }

    public cancelModalState<T extends ModalModel>() {
        if (this.modalActivated.activated) {
            this._store.dispatch(
                new GetDropDown({
                    activated: !this.modalActivated.activated,
                    id: null,
                }),
            );
            this._store.dispatch(
                new GetModal({
                    activated: !this.modalActivated.activated,
                    id: 0,
                }),
            );
            this._store.dispatch(new RemoveCurrentDepartment());
        }
    }
}
