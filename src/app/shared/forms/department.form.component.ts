import { Component, Input, forwardRef, AfterViewInit, Output, HostListener, OnChanges, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from "@angular/forms";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DepartmentFormComponent),
  multi: true
};

@Component({
  selector: 'department-form-inp',
  templateUrl: './department.form.component.html',
  styleUrls: ['./department.form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DepartmentFormComponent implements ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() type = "text";

  @Input() idd = "";

  @Input() text = "";

  @Input() pH: string;

  @Input() c: FormControl = new FormControl();

  @Input() optional: boolean = false;

  errors: Array<any> = ['This field is required'];

  @ViewChild('input') inputRef: ElementRef;

  public constructor() {

  }

  public ngOnChanges() {

  }

  public ngAfterViewInit() {
    if (this.pH === undefined) {
      this.pH = "Enter " + this.text;
    }
    this.c.valueChanges.subscribe(
      () => {
        if (this.c.value == "" || this.c.value == null || this.c.value == undefined) {
          this.innerValue = "";
          this.inputRef.nativeElement.value = "";
        }
      }
    );
  }

  private innerValue: any = '';

  onChange(e: Event, value: any) {

    this.innerValue = value;

    this.propagateChange(this.innerValue);

    this.errors = [];

    for (var key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        if (key === "required") {
          this.errors.push("This field is required");
        } else {
          this.errors.push(this.c.errors[key]);
        }
      }
    }
  }

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  propagateChange = (_: any) => { }

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {

  }
}