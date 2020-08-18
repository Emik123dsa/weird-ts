import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";

import { JwtService } from "../services/jwt.service";
import { Observable } from "rxjs";
@Injectable()
export class HttpTokenInterceptor {
  public constructor(private readonly jwtService: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let configHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }

    const token = this.jwtService.getToken("jwtToken");

    token && Object.assign(configHeaders, {
      "Bearer": token
    })

    const request = req.clone({ setHeaders: configHeaders });

    return next.handle(request);
  }
}