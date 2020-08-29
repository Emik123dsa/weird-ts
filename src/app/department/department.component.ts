import { AppState } from './../store/state/app.state';
import { selectDepartment } from './../store/selectors/department.selector';
import { Component, OnInit } from '@angular/core';
import { selectModals } from '../store/selectors/utils.selector';
import { select, State } from '@ngrx/store';

@Component({
    selector: 'department',
    templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
    public constructor(private readonly _store: State<AppState>) {}

    protected readonly modalContext$ = this._store.pipe(
        select(selectDepartment),
    );

    protected readonly modalActivated$ = this._store.pipe(select(selectModals));
    public ngOnInit(): void {}
}
