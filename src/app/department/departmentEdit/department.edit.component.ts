import { AddDepartment } from './../../store/actions/department.action';
import { GetModal } from './../../store/actions/utils.action';
import { DepartmentSetterModel } from './../../core/models/department.model/department.fields.model';
import { Department } from './../../core/models/department.model/department.model';
import { selectAlteredDepartment } from './../../store/selectors/department.selector';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from './../../store/state/app.state';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
} from '@angular/router';

@Component({
    selector: '<department-edit-vendor>',
    templateUrl: './department.edit.component.html',
    styleUrls: ['./department.edit.component.scss'],
})
export class DepartmentEdit implements AfterViewInit, OnInit, OnDestroy {
    private currentDepartmentFormControl: FormControl = new FormControl();

    private currentDepartmentForm: FormGroup;

    private Department!: Department;

    public constructor(
        private _store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
    ) {}

    public ngAfterViewInit() {}
    public ngOnDestroy() {}

    public ngOnInit() {
        this.route.url.subscribe((data) => {
            const currentId: number = Number(data[data.length - 1].path);
            this._store
                .pipe(select(selectAlteredDepartment(currentId)))
                .subscribe((department: Department) => {
                    this.Department = department;

                    this.currentDepartmentForm = this._fb.group({
                        info_fields: department.info_fields,
                        contact_person_fields: department.contact_person_fields,
                    });
                });
        });
    }

    public cancelDepartment(e: MouseEvent): void {
        this.router.navigateByUrl('/departments');
    }

    public storeDepartment(e: MouseEvent) {
        /**
         *  GET ID FROM CURRENT TIME
         */
        const currentId: string = new Date().getTime().toString();

        const name:
            | DepartmentSetterModel
            | undefined = this.currentDepartmentForm.value.info_fields[
            'essential_fields'
        ].find((data: DepartmentSetterModel): boolean => data.name === 'name');

        if (
            this.currentDepartmentForm.value &&
            this.currentDepartmentForm.valid
        ) {
            // this._store.dispatch(
            //     new AddDepartment({
            //         id: Number(currentId),
            //         department_name: name.value,
            //         photo_vendor: '',
            //         activated: true,
            //         info_fields: this.currentDepartmentForm.value.info_fields,
            //         contact_person_fields: this.currentDepartmentForm.value
            //             .contact_person_fields,
            //     }),
            // );

            this.cancelDepartment(e as MouseEvent);
        }
    }

    public updateDepartment(e: KeyboardEvent | MouseEvent) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    public dispatchFieldsToProps(
        type: string,
        sub_type?: string,
        item?: DepartmentSetterModel,
    ): void {}

    public addNewField<
        T extends keyof Pick<
            Department,
            'info_fields' | 'contact_person_fields'
        >
    >(type: T) {
        this._store.dispatch(
            new GetModal({
                activated: true,
                type,
                id: this.Department.id,
            }),
        );
    }
}
