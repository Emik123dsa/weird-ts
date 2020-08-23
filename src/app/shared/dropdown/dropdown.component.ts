import { Component, OnInit, OnDestroy, Input } from "@angular/core";

@Component({
  selector: 'department-dropdown',
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropDownComponent implements OnInit, OnDestroy {
  public ngOnInit() { }
  public ngOnDestroy() { }

  @Input() activated: boolean = false
}