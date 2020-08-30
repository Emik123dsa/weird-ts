import { SetDepartmentsInfoFields } from './../../store/actions/department.action';
import { DepartmentSetterModel } from './../../core/models/department.model/department.fields.model';
import {
    Component,
    Input,
    EventEmitter,
    forwardRef,
    Inject,
    AfterViewInit,
    TemplateRef,
    Output,
    HostListener,
    OnChanges,
    ViewEncapsulation,
    OnDestroy,
    ViewChild,
    ElementRef,
    Attribute,
    Optional,
} from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormControl,
} from '@angular/forms';
import { Subscribable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DepartmentFormComponent),
    multi: true,
};

@Component({
    selector: 'department-form-inp',
    templateUrl: './department.form.component.html',
    styleUrls: ['./department.form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DepartmentFormComponent
    implements ControlValueAccessor, AfterViewInit, OnChanges {
    @Input() type = 'text';

    @Input() id = '';

    @Input() name = '';

    @Input() _value = '';

    @Input() c: FormControl = new FormControl();

    @Input() optional = false;

    public errors: Array<any> = [];

    private innerValue: DepartmentSetterModel = {} as DepartmentSetterModel;

    @ViewChild('input') inputRef: ElementRef;

    @ViewChild('label') labelRef: ElementRef;

    @Output() dispatchToProps: EventEmitter<any> = new EventEmitter();

    @Input() pH: string;

    public constructor(
        @Attribute('customClass') private customClass: string,
        private element: ElementRef,
    ) {}

    public ngOnChanges() {}

    public dispatchToStoreByProps(value: DepartmentSetterModel): void {
        this.dispatchToProps.emit(null);
    }

    public ngAfterViewInit() {
        this.c.valueChanges.subscribe(() => {
            if (
                this.c.value === {} ||
                this.c.value == null ||
                this.c.value === undefined
            ) {
                this.innerValue = {} as DepartmentSetterModel;

                this.inputRef.nativeElement.value = '';
            }
        });
    }

    onChange(e: string, value: DepartmentSetterModel): void {
        this.innerValue = { ...this.c.value, [value.key]: value.value };

        this.propagateChange(this.innerValue);

        if (this.dispatchToProps) {
            if (e === 'change') {
                this.dispatchToStoreByProps(value);
            }
        }

        this.errors = [];

        for (const key in this.c.errors) {
            this.errors.push(this.c.errors[key]);
        }
    }

    get value(): DepartmentSetterModel {
        return this.innerValue;
    }

    set value(v: DepartmentSetterModel) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }

    propagateChange = (_: DepartmentSetterModel) => {};

    writeValue(value: DepartmentSetterModel) {
        this.innerValue = value;
    }

    registerOnChange(fn: () => void): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: DepartmentSetterModel) {}
}
