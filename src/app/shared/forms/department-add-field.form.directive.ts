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
        const propertyDecorator: Array<string> = property.split('|');

        let propertyVal: Array<any> = control.value;

        if (Array.isArray(propertyDecorator) && propertyDecorator.length > 0) {
            propertyVal = propertyDecorator
                .filter((data: string) => !!data)
                .reduce((acc: any, item: string) => {
                    acc = acc[item];
                    return acc;
                }, propertyVal);
        } else {
            propertyVal = propertyVal[property];
        }

        const newFc: FormControl = new FormControl(propertyVal);

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
            validateProperty('', [
                Validators.required,
                Validators.minLength(4),
                Validators.pattern(/^\[a-Za-Z]+$/i),
            ])
        );
    }
}
