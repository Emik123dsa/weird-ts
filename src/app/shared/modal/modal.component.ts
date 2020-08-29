import { ModalModel } from './../../core/models/utils.model/utils.model';
import { Department } from './../../core/models/department.model/department.model';
import { selectDepartment } from './../../store/selectors/department.selector';
import { Component, Renderer2, OnInit, OnDestroy, Input } from '@angular/core';
import { select, State } from '@ngrx/store';
import { selectModals } from '../../store/selectors/utils.selector';
import { AppState } from '../../store/state/app.state';
@Component({
    selector: 'department-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export default class ModalComponent {
    public constructor(private readonly _store: State<AppState>) {}
    @Input() modalContext!: Department;

    @Input() modalActivated!: ModalModel;
}
