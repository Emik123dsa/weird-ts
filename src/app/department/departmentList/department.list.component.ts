import { GetDropDown } from './../../store/actions/utils.action';
import { Component } from '@angular/core';
import { Department } from '../../core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { Router } from '@angular/router';
import { selectDepartmentsList } from '../../store/selectors/department.selector';
import {
    state,
    style,
    trigger,
    transition,
    animate,
} from '@angular/animations';

@Component({
    selector: '<department-list-vendor>',
    templateUrl: './department.list.component.html',
    styleUrls: ['./department.list.component.scss'],
    animations: [
        trigger('departmentTrigger', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
        ]),
    ],
})
export class DepartmentList {
    public title: string = 'Department';

    public departments$: Observable<Array<Department>> = this._store.pipe(
        select(selectDepartmentsList),
    );

    public constructor(
        private _store: Store<AppState>,
        private _router: Router,
    ) {
        // this._router.navigateByUrl("/");
    }
}
