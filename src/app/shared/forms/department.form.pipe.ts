import { Pipe, PipeTransform } from "@angular/core";

import * as camelCase from "camelcase";

@Pipe({
  name: "length"
})
export class DepartmentFormPipe implements PipeTransform {
  transform(value: string, args?: any): boolean {
    const keys: string[] = Object.values(value);
    return keys.length > 0;
  }
}