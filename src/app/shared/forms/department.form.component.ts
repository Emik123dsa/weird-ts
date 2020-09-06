import { Department } from './../../core/models/department.model/department.model';
import {
    SetDepartmentsInfoFields,
    DepartmentSubFieldsModel,
    DepartmentFieldsModel,
} from './../../store/actions/department.action';
import {
    DepartmentFields,
    DepartmentSetterModel,
} from './../../core/models/department.model/department.fields.model';
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
    Renderer2,
} from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormControl,
} from '@angular/forms';
import { Subscribable, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { shareReplay, startWith } from 'rxjs/operators';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DepartmentFormComponent),
    multi: true,
};

export interface DepartmentForm {
    key: string;
    value: DepartmentSetterModel[];
}
@Component({
    selector: 'department-form-inp',
    templateUrl: './department.form.component.html',
    styleUrls: ['./department.form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DepartmentFormComponent
    implements ControlValueAccessor, AfterViewInit, OnChanges {
    @Input() protected readonly deleteOnAdditional!: boolean;
    @Input() private seq!: number;

    @Input() private type!: string;

    @Input() private id!: string;

    @Input() private name!: string;

    @Input() private text!: string;

    @Input() private c: FormControl = new FormControl();

    @Input() private optional!: boolean;

    public errors: Array<any> = [];

    private innerValue: DepartmentSetterModel = {} as DepartmentSetterModel;

    @ViewChild('input') inputRef!: ElementRef;

    @ViewChild('label') labelRef!: ElementRef;

    @Output() dispatchToProps: EventEmitter<any> = new EventEmitter();
    @Output() removeFromProps: EventEmitter<
        DepartmentSetterModel
    > = new EventEmitter();

    @Input() pH!: string;

    @Input() protected readonly fields!: DepartmentFieldsModel;

    public constructor(
        @Attribute('customClass') private customClass: string,
        private renderer2: Renderer2,
    ) {}

    public ngOnChanges(): void {}

    public ngAfterViewInit() {
        if (this.dispatchToProps) {
            this.renderer2.listen(
                this.inputRef.nativeElement,
                'change',
                (): void => {
                    this.dispatchToProps.emit(null);
                },
            );
        }
    }

    onChange<T extends DepartmentSetterModel>({ key, name, value }: T): void {
        let mutatedValue!: DepartmentSetterModel;
        if (this.c.value[name].hasOwnProperty(key)) {
            mutatedValue = Reflect.ownKeys(
                this.c.value[name][key] as DepartmentSetterModel,
            ).reduce((acc: any, data: keyof T) => {
                acc = {
                    ...acc,
                    [data]:
                        data === 'value'
                            ? value
                            : this.c.value[name][key][data],
                };
                return acc;
            }, {});
        }

        const mappedState: DepartmentSetterModel[] = this.c.value[name].map(
            (data: DepartmentSetterModel, index: string | number | symbol) => {
                return index === key ? mutatedValue : data;
            },
        );

        this.writeValue({ key: name, value: mappedState });

        this.propagateChange(this.innerValue);

        this.errors = [];

        for (const keys in this.c.errors) {
            if (this.c.errors.hasOwnProperty(keys)) {
                this.errors.push(this.c.errors[keys]);
            }
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

    writeValue({ key, value }: DepartmentForm) {
        this.innerValue = {
            ...this.c.value,
            [key]: value,
        };
    }

    registerOnChange(fn: () => void): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: DepartmentSetterModel) {}

    protected removeAdditionalField<T extends DepartmentSetterModel>({
        key,
        name,
        value,
    }: T): void {
        if (this.removeFromProps) {
            this.removeFromProps.emit({
                key: this.fields,
                name,
            });
        }
    }
}
