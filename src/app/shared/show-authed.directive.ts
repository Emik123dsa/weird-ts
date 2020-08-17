import { ViewContainerRef, Directive, OnInit, TemplateRef, Input } from "@angular/core";
import { UserService } from "../core/services";
@Directive({ selector: "[isAuth]" })
export class ShowAuthedDirective implements OnInit {
  public constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

  protected condition: boolean;

  public ngOnInit() {
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

  @Input() set isAuth(condition: boolean) {
    this.condition = condition;
  }
}