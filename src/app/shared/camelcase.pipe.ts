import { Pipe, PipeTransform } from '@angular/core';

import * as camelCase from 'camelcase';

@Pipe({
    name: 'camelcase',
})
export class CamelCasePipe implements PipeTransform {
    transform(value: string, args?: any): string {
        return camelCase(value);
    }
}
