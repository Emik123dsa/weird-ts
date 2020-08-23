import { ModalModel, DropDownModel } from "../../core/models";
import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { select, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { EnumUtils, GetDropDown, GetDropDownSuccess, GetModal, GetModalSuccess } from '../actions/utils.action';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectDropDown, selectModals } from '../selectors/utils.selector';
import { Observable, of } from 'rxjs';

@Injectable()
export class UtilEffects {

  @Effect()
  getDropDown$ = this._actions$.pipe(
    ofType<GetDropDown>(EnumUtils.GetDropDown),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectDropDown))),
    switchMap(([vendor]): Observable<GetDropDownSuccess> => {

      return of(new GetDropDownSuccess(vendor))
    })
  )

  @Effect()
  getModal$ = this._actions$.pipe(
    ofType<GetModal>(EnumUtils.GetModal),
    map(actions => actions.payload),
    withLatestFrom(this._store.pipe(select(selectModals))),
    switchMap(([data]) => {
      return of(new GetDropDownSuccess(data))
    })
  )

  public constructor(
    private _store: Store<AppState>,
    private _actions$: Actions
  ) { }
}