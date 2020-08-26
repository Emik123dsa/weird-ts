import { Department } from './../../core/models/department.model/department.model';
import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'department-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropDownComponent implements OnInit, OnDestroy {
    @Output() editItem: EventEmitter<any> = new EventEmitter<MouseEvent>();
    @Output() deleteItem: EventEmitter<any> = new EventEmitter<MouseEvent>();
    @Input() public readonly props: Department;

    public ngOnInit() {}
    public ngOnDestroy() {}
    /**
     * Edit item
     *
     * @memberof DropDownComponent
     */
    public _editItem(): void {
        this.editItem.emit(null);
    }
    /**
     * Delete item
     *
     * @memberof DropDownComponent
     */
    public _deleteItem(): void {
        this.deleteItem.emit(null);
    }
}
