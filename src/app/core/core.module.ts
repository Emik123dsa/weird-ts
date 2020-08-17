import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ApiService,
  JwtService,
  DepartmentService,
  AuthGuard,
  UserService,
} from "./services";
import { HttpTokenInterceptor } from "./interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    ApiService,
    JwtService,
    DepartmentService,
    AuthGuard,
    UserService,
  ],
  declarations: [],
})
export class CoreModule { }
