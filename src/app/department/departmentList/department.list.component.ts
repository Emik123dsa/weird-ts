import { Component } from "@angular/core";
import { Department, DepartmentAccurate } from '../../core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from '../../store/state/app.state';
import { Router } from '@angular/router';
import { selectDepartmentsList } from '../../store/selectors/department.selector';

@Component({
  selector: "<department-list-vendor>",
  templateUrl: "./department.list.component.html",
  styleUrls: ["./department.list.component.scss"],
})
export class DepartmentList {
  public title: string = "Department";

  public departments$: Observable<Array<Department<DepartmentAccurate>>> = this._store.pipe(select(selectDepartmentsList));

  public constructor(
    private _store: Store<AppState>,
    private _router: Router
  ) {
    // this._router.navigateByUrl("/");


  }

}
