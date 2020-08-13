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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
    },
    ApiService,
    JwtService,
    DepartmentService,
    AuthGuard,
    UserService,
  ],
  imports: [CommonModule],
  declarations: [],
})
export class CoreModule {}
