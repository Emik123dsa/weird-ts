import { AppState } from './../store/state/app.state';
import { selectDepartment } from './../store/selectors/department.selector';
import { Component, OnInit } from '@angular/core';
import { selectModals } from '../store/selectors/utils.selector';
import { select, State, Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { GetDropDown, GetModal } from '../store/actions/utils.action';
import { RemoveCurrentDepartment } from '../store/actions/department.action';

@Component({
    selector: 'department',
    templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit {
    public constructor(
        private router: Router,
        private readonly _store: Store<AppState>,
    ) {
        router.events.subscribe((event: NavigationStart) => {
            if (event instanceof NavigationStart) {
                this._store.dispatch(
                    new GetDropDown({
                        activated: false,
                        id: null,
                    }),
                );
                this._store.dispatch(
                    new GetModal({
                        id: 0,
                        activated: false,
                        type: null,
                    }),
                );
                this._store.dispatch(new RemoveCurrentDepartment());
            }
        });
    }

    protected readonly modalContext$ = this._store.pipe(
        select(selectDepartment),
    );

    protected readonly modalActivated$ = this._store.pipe(select(selectModals));
    public ngOnInit(): void {}
}
