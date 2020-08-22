
import { GetConfig, GetConfigSuccess, EnumConfig, ConfigAction } from "../actions/config.action";
// import { DepartmentService } from '../../core/services';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectConfig } from "../selectors/config.selector";
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ConfigModel } from '../../core';

@Injectable()
export class ConfigEffect {
  // @Effect()
  // getConfig$ = this._actions$.pipe(
  //   ofType<GetConfig>(EnumConfig.GetConfig),
  //   switchMap((config: any) => {
  //     return of(new GetConfigSuccess(config))
  //   })
  // );

  public constructor(
    private _actions$: Actions
  ) { }
}

