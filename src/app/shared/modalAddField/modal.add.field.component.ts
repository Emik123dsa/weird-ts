import {
    AddAdditionalFields,
    DepartmentFieldsModel,
} from './../../store/actions/department.action';
import {
    Component,
    OnInit,
    OnDestroy,
    Optional,
    Inject,
    AfterViewInit,
    Input,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { validateProperty } from '../forms/department-add-field.form.directive';
import { Subscription, Observable, of, iif, EMPTY, fromEvent } from 'rxjs';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { DOCUMENT } from '@angular/common';
import { map, pluck, switchMap, throttleTime } from 'rxjs/operators';
import {
    Department,
    ModalModel,
    DepartmentSetterModel,
    DepartmentFields,
} from '../../core';
import { GetModal } from '../../store/actions/utils.action';
import {
    DepartmentSubFieldsModel,
    SetDepartmentsInfoFields,
    SetDepartmentsContactPersonsFields,
} from '../../store/actions/department.action';
import * as camelCase from 'camelcase';
import { DepartmentFormComponent } from '../forms/department.form.component';
import {
    selectDepartmentsList,
    selectVendorInfoFields,
    selectVendorContactPersonsFields,
} from '../../store/selectors/department.selector';
import { FieldsPickModel } from '../../store/state/department.state';
import { ɵKeyEventsPlugin } from '@angular/platform-browser';
import { selectModals } from '../../store/selectors/utils.selector';
@Component({
    selector: 'department-add-field-modal',
    templateUrl: './modal.add.field.component.html',
    styleUrls: ['./modal.add.field.component.scss'],
})
export class ModalAddFieldComponent
    implements OnInit, OnDestroy, AfterViewInit {
    private sumbitSubscription!: Subscription;

    private fieldsControl: FormControl = new FormControl();

    private currentModal: Observable<ModalModel> = this._store.pipe(
        select(selectModals),
    );
    /**
     * Current field is required to add new field
     *
     * @private
     * @type {string}
     * @memberof ModalAddFieldComponent
     */
    private currentField!: string;
    /**
     * Current id is allowing us to add new customized field accordingly to current choosen department
     *
     * @private
     * @type {(string | number)}
     * @memberof ModalAddFieldComponent
     */
    private currentId!: string | number;

    private readonly departmentsInfoFields$ = this._store.pipe(
        select(selectVendorInfoFields),
    );

    private readonly departmentContactFields$ = this._store.pipe(
        select(selectVendorContactPersonsFields),
    );

    private fieldsGroup: FormGroup;

    @Input() modalActivated!: ModalModel;
    @Input() modalContext!: Department;

    @ViewChild('formModalAdd') protected readonly formModalAdd!: ElementRef;

    public constructor(
        private readonly _route: ActivatedRoute,
        private _fB: FormBuilder,
        private _store: Store<AppState>,
    ) {
        this.fieldsGroup = this._fB.group({
            fields: [
                {
                    addField: [
                        {
                            key: 'addField',
                            value: '',
                            name: 'addField',
                        } as DepartmentSetterModel,
                    ],
                },
                validateProperty('addField|0|value', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern(/^[a-zA-Z]+$/),
                ]),
            ],
        });
    }

    public ngAfterViewInit() {
        this.sumbitSubscription = fromEvent<KeyboardEvent | MouseEvent>(
            this.formModalAdd.nativeElement,
            'submit',
        )
            .pipe()
            .subscribe((e: MouseEvent | KeyboardEvent) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (
                    this.fieldsGroup.valid &&
                    (!this.fieldsGroup.touched || !this.fieldsGroup.dirty)
                ) {
                    this.currentModal
                        .pipe(
                            throttleTime(1000),
                            switchMap((data: ModalModel) =>
                                iif(() => !data.type, EMPTY, of(data)),
                            ),
                        )
                        .subscribe((data: ModalModel) => {
                            this.currentField = data.type;
                            this.currentId = data.id;
                        });

                    this._store.dispatch(
                        new AddAdditionalFields({
                            id: this.currentId || null,
                            fields: this.currentField as DepartmentFieldsModel,
                            mutated_fields: {
                                key: this.fieldsGroup.value.fields.addField[0]
                                    .value,
                                value: '',
                                name: camelCase(
                                    this.fieldsGroup.value.fields.addField[0]
                                        .value,
                                ),
                            },
                        }),
                    );
                    this.cancelModalState();
                }
            });
    }

    public cancelModalState<T extends ModalModel>() {
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

    public ngOnInit() {}

    public ngOnDestroy() {
        if (this.sumbitSubscription) {
            this.sumbitSubscription.unsubscribe();
        }
    }
}
