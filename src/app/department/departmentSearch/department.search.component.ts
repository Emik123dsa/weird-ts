import { Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { DepartmentQueryModel } from "../../core/models";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../../core/services';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { DOCUMENT } from "@angular/common"
import { distinctUntilChanged, map, pluck, debounceTime } from 'rxjs/operators';
@Component({
  selector: "department-search",
  templateUrl: "./department.search.component.html",
  styleUrls: ["./department.search.component.scss"]
})
export class DepartmentSearch implements OnInit, OnDestroy {

  private departmentSearch = ({} as DepartmentQueryModel) as Subscription;

  private departmentForm: FormGroup;

  protected query: Subscription;

  private queryControl: FormControl = new FormControl();

  public constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    @Optional() @Inject(DOCUMENT) private document: Document,
  ) {

    this.departmentForm = this.fb.group({
      query: ""
    } as DepartmentQueryModel);

  }

  public ngOnInit() {
    this.departmentSearch = fromEvent<KeyboardEvent>(this.document, 'keyup').pipe(
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe((data: KeyboardEvent) => {
  
      this.departmentService.query(this.departmentForm.value).subscribe(data => {
        console.log(data)
      })
    });
  }

  public ngOnDestroy() {
    if (this.query) this.query.unsubscribe();
  }

  public navigateToCreate(e: MouseEvent): void {
    this.router.navigateByUrl("/departments/create");
  }


  public createQuery(e: MouseEvent): void {
    e.preventDefault();

  }

}