import { Component, OnInit } from "@angular/core";

import { DepartmentService } from "../../core/services";
import { DepartmentAccurate } from "../../core";

import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "<department-create-vendor>",
  templateUrl: "./department.create.component.html",
  styleUrls: ["./department.create.component.scss"],
})
export class DepartmentCreate implements OnInit {

  public title: string = "Department Create";

  private department: DepartmentAccurate = {} as DepartmentAccurate;

  items: string[] = ['vova', 'hello'];

  private departmentForm: FormGroup;

  private loading: boolean = false;

  private additionalFields: FormControl = new FormControl();

  private erros: Object = {};

  public constructor(
    private departmentService: DepartmentService,
    private router: ActivatedRoute,
    private route: Router,
    private fB: FormBuilder
  ) {

    this.departmentForm = this.fB.group({
      id: "",
      name: "",
      API_SCHEMA_KEY: "",
      email: "",
      telephone: "",
      owner: "",
    });

    this.department.additional_fields = {};

  }

  public ngOnInit() {

  }

  public createForm(e: MouseEvent): void {

    e.preventDefault();
    e.stopImmediatePropagation();
    this.departmentService.save(this.departmentForm.value).subscribe(data => {
      console.log(data)
    }, err => { 
        console.log(err)
    }) 

    //console.log(this.departmentForm.value)
  }
}
