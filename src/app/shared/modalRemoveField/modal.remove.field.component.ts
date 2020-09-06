import {
    DemolishAdditionalFields,
    DepartmentFieldsModel,
} from './../../store/actions/department.action';
import { ButtonComponent } from './../buttons/button.component';
import { DepartmentSetterModel } from './../../core/models/department.model/department.fields.model';
import { GetModal } from './../../store/actions/utils.action';
import { Department } from './../../core/models/department.model/department.model';
import { ModalModel } from './../../core/models/utils.model/utils.model';
import { AppState } from './../../store/state/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import {
    Component,
    OnDestroy,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    Input,
} from '@angular/core';

@Component({
    selector: '<department-modal-remove-field>',
    templateUrl: './modal.remove.field.componenet.html',
    styleUrls: ['./modal.remove.field.component.scss'],
})
export class ModalRemoveFieldComponent implements OnInit, OnDestroy {
    /**
     * Instance of Modal Activated
     *
     * @type {ModalModel}
     * @memberof ModalRemoveFieldComponent
     */
    @Input() modalActivated!: ModalModel;
    /**
     * Instance of ModalContext
     *
     * @type {Department[]}
     * @memberof ModalRemoveFieldComponent
     */
    @Input() modalContext!: Department[];

    public ngOnInit() {}

    public constructor(
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _store: Store<AppState>,
    ) {}

    public ngOnDestroy() {}

    protected cancelModalState(e: MouseEvent) {
        if (this.modalActivated.activated) {
            this._store.dispatch(
                new GetModal({
                    activated: !this.modalActivated.activated,
                    type: null,
                    id: null,
                }),
            );
        }
    }

    protected removeAdditionalFields(e: MouseEvent) {
        if (this.modalActivated.activated) {
            this._store.dispatch(
                new DemolishAdditionalFields({
                    id: this.modalActivated.id || null,
                    fields: this.modalActivated.type.split(
                        '|',
                    )[1] as DepartmentFieldsModel,
                    mutated_fields: {
                        key: this.modalActivated.bind,
                    },
                }),
            );

            this.cancelModalState(e as MouseEvent);
        }
    }
}
