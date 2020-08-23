import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { Department } from "../../core/models";

import { fromEvent, Observable, of, Subscription } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectDropDown } from '../../store/selectors/utils.selector';
import { GetDropDown } from '../../store/actions/utils.action';

@Component({
  selector: "department-item",
  templateUrl: "./department.item.component.html",
  styleUrls: ["./department.item.component.scss"]
})
export class DepartmentItem implements OnInit, OnDestroy {

  private $dropDown = this._store.pipe(select(selectDropDown));

  @Input() context: { [key: number]: Department };

  @Output() editItem: EventEmitter<any> = new EventEmitter<MouseEvent>();

  @Output() deleteItem: EventEmitter<any> = new EventEmitter<MouseEvent>();

  public constructor(private _store: Store<AppState>) { }
  public ngOnInit() {

  }
  /**
   * Edit todo item
   *
   * @param {number} e
   * @memberof DepartmentItem
   */
  public _editItem(e: number): void {
    this.editItem.emit(e);
  }
  /**
   * Delete todo item
   *
   * @param {number} e
   * @memberof DepartmentItem
   */
  public _deleteItem(e: number): void {
    this.deleteItem.emit(e);
  }

  public activateDropdownState(key: boolean, value: number): void {
    this._store.dispatch(new GetDropDown({
      activated: true,
      id: 123
    }))
  }

  public assimilateDropdownState(key: boolean, value: number): void {
    // console.log('by')
  }

  public ngOnDestroy() { }


}