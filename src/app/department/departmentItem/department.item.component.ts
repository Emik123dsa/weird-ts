import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { Department, DepartmentAccurate } from "../../core/models";

import { fromEvent, Observable, of, Subscription } from "rxjs";
import { filter, map } from 'rxjs/operators';

@Component({
  selector: "department-item",
  templateUrl: "./department.item.component.html",
  styleUrls: ["./department.item.component.scss"]
})
export class DepartmentItem implements OnInit, OnDestroy {

  @Input() context: { [key: number]: Department<DepartmentAccurate> };

  @Output() editItem: EventEmitter<any> = new EventEmitter<MouseEvent>();

  @Output() deleteItem: EventEmitter<any> = new EventEmitter<MouseEvent>();

  private openedModal: Subscription;

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
    console.log('hello')
  }

  public assimilateDropdownState(key: boolean, value: number): void {
    console.log('by')
  }

  public ngOnDestroy() { }


}