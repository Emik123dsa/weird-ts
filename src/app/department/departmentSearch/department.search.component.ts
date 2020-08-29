import { Store } from '@ngrx/store';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DepartmentQueryModel } from '../../core/models';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { DepartmentService } from '../../core/services';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { distinctUntilChanged, map, pluck, debounceTime } from 'rxjs/operators';
import { State } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { GetDropDown } from '../../store/actions/utils.action';
import { DepartmentFormComponent } from '../../shared/forms/department.form.component';
@Component({
    selector: 'department-search',
    templateUrl: './department.search.component.html',
    styleUrls: ['./department.search.component.scss'],
})
export class DepartmentSearch implements OnDestroy, AfterViewInit {
    private departmentSearch: Subscription;

    public departmentForm: FormGroup;

    private queryControl: FormControl = new FormControl();

    public constructor(
        private departmentService: DepartmentService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _store: Store<AppState>,
        @Optional() @Inject(DOCUMENT) private document: Document,
    ) {
        this.departmentForm = this.fb.group({
            query: 'sub_query',
        } as DepartmentQueryModel);
    }

    @ViewChild(DepartmentFormComponent)
    public readonly child!: DepartmentFormComponent;

    public ngAfterViewInit() {
        this.departmentSearch = fromEvent<KeyboardEvent>(
            this.child.inputRef.nativeElement,
            'keyup',
        )
            .pipe(distinctUntilChanged(), debounceTime(500))
            .subscribe((e: KeyboardEvent) => {
                console.log(this.departmentForm.value.query);
                this.departmentService
                    .query(this.departmentForm.value)
                    .subscribe((data) => {
                        console.log(data);
                    });
            });
    }

    public ngOnDestroy() {
        if (this.departmentSearch) {
            this.departmentSearch.unsubscribe();
        }
    }

    public navigateToCreate(e: MouseEvent): void {
        this.router.navigateByUrl('/departments/create');
    }

    public createQuery(e: MouseEvent): void {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}
