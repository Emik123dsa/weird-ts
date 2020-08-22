import { Component, Input, forwardRef, AfterViewInit, TemplateRef, Output, HostListener, OnChanges, ViewEncapsulation, OnDestroy, ViewChild, ElementRef, Attribute } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from "@angular/forms";
import { Subscribable } from 'rxjs';
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

  @Input() c: FormControl = new FormControl();

  @Input() optional: boolean = false;

  errors: Array<any> = [];

  @ViewChild('input') inputRef: ElementRef;

  @ViewChild('label') labelRef: ElementRef;

  @Input() pH: string;
  /**
   *
   *
   * @type {string}
   * @memberof DepartmentFormComponent
   */
  // @Input() customClass!: string;

  public constructor(
    @Attribute('customClass') private customClass: string,
    private element: ElementRef
  ) {
    
  }

  public ngOnChanges() {

  }

  public ngAfterViewInit() {
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

  activeInput(value: any) {
    if (Object.keys(value).length > 0) {
      this.labelRef.nativeElement.classList.add("label-control__active")
    } else {
      this.labelRef.nativeElement.classList.remove("label-control__active");
    }
  }

  onChange(e: Event, value: any): void {

    this.innerValue = value;

    this.propagateChange(this.innerValue);

    this.activeInput(value);

    this.errors = [];

    for (var key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        if (key === "required") {
          this.errors.push("This field is required");
        } else {
          this.errors.push(key);
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