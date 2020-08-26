/**
 * SetterType
 *
 * @export
 * @interface DepartmentSetterModel
 */
export interface DepartmentSetterModel {
  key: string;
  value: string;
  name?: string;
}
/**
 * DepartmentFields sagas
 *
 * @export
 * @interface DepartmentFields
 * @template T
 * @template K
 */
export interface DepartmentFields<T, K> {
  essential_fields: T[];
  additional_fields: K[];
}
