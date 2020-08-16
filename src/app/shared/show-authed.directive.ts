import { ViewContainerRef, Directive, OnInit, TemplateRef, Input } from "@angular/core";
import { UserService } from "../core/services";
@Directive({ selector: "[appShowAuthed]" })
export class ShowAuthedDirective implements OnInit {
  public constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

  protected condition: boolean;

  ngOnInit() {
    this.userService.isAuthenicated.subscribe(
      isAuth => {
        if (isAuth && this.condition || !isAuth && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      },
    )
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}