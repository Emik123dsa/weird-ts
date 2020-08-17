import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from "../../core/services/api.service";
import { map } from 'rxjs/operators';
@Component({
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"],
    selector: "index-vendor"
})
export class IndexComponent implements OnInit {
    private departmentGroup: FormGroup;

    public constructor(
        private router: ActivatedRoute,
        private route: Router,
        private fb: FormBuilder
    ) {
        this.departmentGroup = this.fb.group({
            title: "",
            sub_title: "",
            context: ""
        })
    }

    public ngOnInit() { }

    public submitForm(e: MouseEvent) {

        e.preventDefault();
        e.stopImmediatePropagation();
      
    }
}