import { take, distinctUntilChanged } from 'rxjs/operators';
import { Department } from './../../core/models/department.model/department.model';
import { selectDepartment } from './../../store/selectors/department.selector';
import {
    RemoveCurrentDepartment,
    SetCurrentDepartment,
} from './../../store/actions/department.action';

import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
// import { Department } from '../../core/models';
import { AppState } from '../../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectDropDown } from '../../store/selectors/utils.selector';
import { GetDropDown } from '../../store/actions/utils.action';
/**
 * Helper for Department Model
 *
 * @export
 * @interface KeyAndValueOfDepartment
 */
export interface KeyAndValueOfDepartment {
    value: Department;
    id: string | number;
    key: string;
}

@Component({
    selector: 'department-item',
    templateUrl: './department.item.component.html',
    styleUrls: ['./department.item.component.scss'],
})
export class DepartmentItem implements OnInit, OnDestroy {
    protected dropDown$ = this._store.pipe(select(selectDropDown));
    protected context$ = this._store.pipe(select(selectDepartment));

    @Input() context: KeyAndValueOfDepartment;

    public constructor(private _store: Store<AppState>) {}

    public deleteItemCurrent(e: MouseEvent) {}

    public editItemCurrent(e: number) {
        console.log(e);
    }

    public ngOnInit() {}
    /**
     * Outside click implementation
     *
     * @param {boolean} activated
     * @memberof DepartmentItem
     */
    public closeDropDownState(activated: boolean) {
        this._store.dispatch(
            new GetDropDown({
                activated,
                id: null,
            }),
        );

        this._store.dispatch(new RemoveCurrentDepartment());
    }
    /**
     * Outside click implementation
     *
     * @memberof DepartmentItem
     */
    public activeDropdownState(key: boolean, value: number): void {
        this._store.dispatch(
            new GetDropDown({
                activated: key,
                id: value,
            }),
        );

        this._store.dispatch(new SetCurrentDepartment(this.context.value));
    }

    public ngOnDestroy() {}
}
