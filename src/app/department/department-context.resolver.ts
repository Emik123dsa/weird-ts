import { Injectable } from '@angular/core';
import {
    Resolve,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { AppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { GetDropDown, GetModal } from '../store/actions/utils.action';
import { RemoveCurrentDepartment } from '../store/actions/department.action';

@Injectable()
export class DepartmentContextResolver implements Resolve<void> {
    constructor(private router: Router, private _store: Store<AppState>) {}
    resolve(): void {}
}
