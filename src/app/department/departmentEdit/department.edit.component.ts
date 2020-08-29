import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: '<department-edit-vendor>',
    templateUrl: './department.edit.component.html',
    styleUrls: ['./department.edit.component.scss'],
})
export class DepartmentEdit implements AfterViewInit, OnInit, OnDestroy {
    public title: string = 'Department';

    public ngAfterViewInit() {}
    public ngOnDestroy() {}
    public ngOnInit() {}
}
