import {
    ValidatorFn,
    AbstractControl,
    FormControl,
    Validator,
    Validators,
    NG_VALIDATORS,
} from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function validateProperty(
    property: string,
    validators: ValidatorFn[],
): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const propertyVal = control.value && control.value[property];
        const newFc = new FormControl(propertyVal);

        const failedValidators = validators
            .map((v) => v(newFc))
            .filter((v) => !!v);

        return failedValidators.length
            ? { invalidProperty: failedValidators }
            : null;
    };
}

@Directive({
    selector: '[addFieldValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DepartmentAddFieldValidator,
            multi: true,
        },
    ],
})
export class DepartmentAddFieldValidator implements Validator {
    @Input('addFieldValidator')
    protected readonly addFieldValidator!: string;

    validate(control: AbstractControl): ReturnType<typeof validateProperty> {
        return (
            this.addFieldValidator &&
            validateProperty('super_key', [
                Validators.required,
                Validators.minLength(4),
            ])
        );
    }
}
