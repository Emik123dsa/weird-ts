import { Effect, ofType, Actions } from "@ngrx/effects";

import { Injectable } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { AppState } from "../state/app.state";

import { Department, DepartmentAccurate } from "../../core/models";

import { GetDepartment, GetDepartments, GetDepartmentSuccess, GetDepartmentsSuccess, EnumDepartmentActions } from "../actions/department.action";
import { DepartmentService } from '../../core/services';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectDepartment, selectDepartmentsList } from "../selectors/department.selector";
import { of } from 'rxjs';
@Injectable()
export class DepartmentEffect {

  constructor(private _actions$: Actions, private _departmentService: DepartmentService, private _store: Store<AppState>) { }

  @Effect()
  getDepartments$ = this._actions$.pipe(
    ofType<GetDepartments>(EnumDepartmentActions.GetDepartments),
    switchMap(() => this._departmentService.getAll()),
    switchMap((departmentHttp: Department<DepartmentAccurate>[]) => of(new GetDepartmentsSuccess(departmentHttp)))
  )
}