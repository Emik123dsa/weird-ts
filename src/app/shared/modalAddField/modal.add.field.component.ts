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
import { Subscription, fromEvent, Observable } from 'rxjs';
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
import { map, pluck } from 'rxjs/operators';
import {
    Department,
    ModalModel,
    DepartmentSetterModel,
    DepartmentFields,
} from '../../core';
import { GetModal } from '../../store/actions/utils.action';
import {
    SetDepartmentsFieldsModel,
    DepartmentFieldsModel,
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
@Component({
    selector: 'department-add-field-modal',
    templateUrl: './modal.add.field.component.html',
    styleUrls: ['./modal.add.field.component.scss'],
})
export class ModalAddFieldComponent
    implements OnInit, OnDestroy, AfterViewInit {
    private fieldsControl: FormControl = new FormControl();

    private readonly departmentsInfoFields$ = this._store.pipe(
        select(selectVendorInfoFields),
    );

    private readonly departmentContactFields$ = this._store.pipe(
        select(selectVendorContactPersonsFields),
    );

    private fieldsGroup: FormGroup;

    public inputFields: Subscription;

    @Input() modalActivated!: ModalModel;
    @Input() modalContext!: Department;

    @ViewChild(DepartmentFormComponent)
    private readonly child!: DepartmentFormComponent;

    public constructor(
        private readonly _route: ActivatedRoute,
        private _fB: FormBuilder,
        private _store: Store<AppState>,
        @Optional() @Inject(DOCUMENT) private readonly document: Document,
    ) {
        this.fieldsGroup = this._fB.group({
            fields: [
                '',
                validateProperty('super_key', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern(/^[a-zA-Z]+$/i),
                ]),
            ],
        });
    }

    public ngAfterViewInit() {
        this.inputFields = fromEvent<KeyboardEvent>(this.document, 'keyup')
            .pipe(pluck<KeyboardEvent, string>('key'))
            .subscribe((data: string) => {});
    }

    public storeNewField(e: KeyboardEvent | MouseEvent): void {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.fieldsGroup.valid) {
            const mutatedFields: SetDepartmentsFieldsModel = {
                fields: this.modalActivated.type as DepartmentFieldsModel,
                sub_fields: 'additional_fields' as DepartmentSubFieldsModel,
                regenerator: {
                    key: this.fieldsGroup.value.fields.super_key,
                    value: '',
                    name: camelCase(this.fieldsGroup.value.fields.super_key),
                },
            };

            // this.departmentsInfoFields$.subscribe(
            //     (
            //         data: DepartmentFields<
            //             DepartmentSetterModel,
            //             DepartmentSetterModel
            //         >,
            //     ) => {
            //         const {
            //             essential_fields,
            //             additional_fields,
            //         }: DepartmentFields<
            //             DepartmentSetterModel,
            //             DepartmentSetterModel
            //         > = fields;

            //         const mutatedFields: DepartmentFields<
            //             DepartmentSetterModel,
            //             DepartmentSetterModel
            //         > = {
            //             essential_fields,
            //             additional_fields,
            //         };

            //         const mergedMutatedFields: DepartmentSetterModel[] = essential_fields.concat(
            //             additional_fields,
            //         );
            //     },
            // );

            switch (this.modalActivated.type) {
                case 'info_fields':
                    this._store.dispatch(
                        new SetDepartmentsInfoFields(mutatedFields),
                    );

                    break;
                case 'contact_person_fields':
                    this._store.dispatch(
                        new SetDepartmentsContactPersonsFields(mutatedFields),
                    );
                    break;
            }

            this._store.dispatch(
                new GetModal({
                    activated: !this.modalActivated.activated,
                    type: null,
                    id: 0,
                }),
            );
        }
    }

    public cancelModalState<T extends ModalModel>() {
        if (this.modalActivated.activated) {
            this._store.dispatch(
                new GetModal({
                    activated: !this.modalActivated.activated,
                    type: null,
                    id: 0,
                }),
            );
        }
    }

    public ngOnInit() {}
    public ngOnDestroy() {
        if (this.inputFields) {
            this.inputFields.unsubscribe();
        }
    }
}
