import {
    ModalModel,
    DropDownModel,
} from './../../core/models/utils.model/utils.model';
import { Observable } from 'rxjs';
import { GetModal } from './../../store/actions/utils.action';
import { ActivatedRoute, Router } from '@angular/router';
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
import {
    selectDropDown,
    selectModals,
} from '../../store/selectors/utils.selector';
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
    protected dropDown$: Observable<DropDownModel> = this._store.pipe(
        select(selectDropDown),
    );
    protected context$: Observable<Department> = this._store.pipe(
        select(selectDepartment),
    );
    protected modalActivated$: Observable<ModalModel> = this._store.pipe(
        select(selectModals),
    );
    /**
     * Context
     *
     * @type {KeyAndValueOfDepartment}
     * @memberof DepartmentItem
     */
    @Input() context: KeyAndValueOfDepartment;
    /**
     * Creates an instance of DepartmentItem.
     * @param {Store<AppState>} _store
     * @param {Router} _router
     * @param {ActivatedRoute} _route
     * @memberof DepartmentItem
     */
    public constructor(
        private _store: Store<AppState>,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
    ) {}
    /**
     * Delete item current
     *
     * @param {number} e
     * @memberof DepartmentItem
     */
    public deleteItemCurrent(e: number): void {
        this._store.dispatch(
            new GetModal({
                activated: true,
                id: e,
            }),
        );
    }
    /**
     * Edit current item
     *
     * @param {number} e
     * @returns {Promise<boolean>}
     * @memberof DepartmentItem
     */
    public editItemCurrent(e: number): void {
        if (e) this._router.navigate(['departments', 'edit', e]);
    }
    /**
     * Implementation of NgOnInit
     *
     * @memberof DepartmentItem
     */
    public ngOnInit() {}
    /**
     * Outside click implementation
     *
     * @param {boolean} activated
     * @memberof DepartmentItem
     */
    public closeDropDownState<T extends ModalModel>(activated: boolean): void {
        this.modalActivated$.subscribe(({ activated, id }: T): void => {
            if (!activated) {
                this._store.dispatch(
                    new GetDropDown({
                        activated,
                        id: null,
                    }),
                );
                this._store.dispatch(new RemoveCurrentDepartment());
            }
        });
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
    /**
     * Implementation of NgDestroy
     *
     * @memberof DepartmentItem
     */
    public ngOnDestroy() {}
}
