import { Attribute, Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, ViewChild, EventEmitter } from "@angular/core";

export type ButtonColor = "gray" | "red" | "green";
/**
 * Button Component
 *
 * @export
 * @class ButtonComponent
 * @implements {OnInit}
 */
@Component({
  selector: "department-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

  private condition: boolean = false;

  public constructor(@Attribute('link') private readonly link: string | boolean,
    @Attribute('arrow') private readonly arrow: string | boolean
  ) {
    this.condition = this.link !== null ? true : false;
    this.arrow = this.arrow !== null ? true : false;
  }

  public ngOnInit() {

  }
  /**
   * Kind of the button, which you want to seize
   *
   * @type {string}
   * @memberof ButtonComponent
   */
  @Input()
  type?: string;
  /**
   * Disabled
   *
   * @type {boolean}
   * @memberof ButtonComponent
   */
  @Input()
  disabled?: boolean;
  /**
   * Text
   *
   * @type {string}
   * @memberof ButtonComponent
   */
  @Input()
  text?: string;
  /**
   * Color implementation
   *
   * @type {string}
   * @memberof ButtonComponent
   */
  @Input()
  color?: ButtonColor;
  /**
   * To Bind Button child
   *
   * @type {HTMLElement}
   * @memberof ButtonComponent
   */
  @ViewChild('button') btnRef: HTMLElement;
  /**
   * OnPushBtn implementation
   *
   * @memberof ButtonComponent
   */
  @Output() onPushBtn: EventEmitter<any> = new EventEmitter<MouseEvent>();

  public openDropdown(e: MouseEvent) {
    this.onPushBtn.emit('hello');
  }
  
}