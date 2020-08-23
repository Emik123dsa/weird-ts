import { Component, OnInit, OnDestroy } from "@angular/core";

import { DepartmentService } from "../../core/services";

import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Department, DepartmentFields, DepartmentSetterModel } from '../../core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { selectVendorContactPeresonsFields, selectVendorInfoFields } from '../../store/selectors/department.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: "<department-create-vendor>",
  templateUrl: "./department.create.component.html",
  styleUrls: ["./department.create.component.scss"],
})
export class DepartmentCreate implements OnInit, OnDestroy {

  public title: string = "Department Create";

  private departmentInfoFields$ = this._store.pipe(select(selectVendorInfoFields));

  private departmentContactPersonsFields$ = this._store.pipe(select(selectVendorContactPeresonsFields));

  private departmentForm: FormGroup;

  private errors: Object = {};

  public constructor(
    private departmentService: DepartmentService,
    private router: ActivatedRoute,
    private route: Router,
    private fB: FormBuilder,
    private _store: Store<AppState>
  ) {

    this.departmentForm = this.fB.group({
      id: "" as string,
      name: "" as string,
      API_SCHEMA_KEY: "" as string,
      email: "" as string,
      telephone: "" as string,
      owner: "" as string,
    });

   
  }
  public ngOnDestroy() {
   
  }

  public ngOnInit() {

  }

  public createForm(e: MouseEvent): void {

    e.stopImmediatePropagation();

    console.log(this.departmentForm.value)

    // this.departmentService.save(this.departmentForm.value).subscribe(data => {
    //   console.log(data)
    // }, err => { 
    //     console.log(err)
    // }) 

  }

}
