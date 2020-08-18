import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";

import { ApiService, JwtService } from "./index";
import { of } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

import { User } from "../models";

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);

  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenicatedSubject = new ReplaySubject<boolean>(1);

  public isAuthenicated = this.isAuthenicatedSubject.asObservable();

  public constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private http: HttpClient
  ) { }

  public populate(): void {
    if (this.jwtService.getToken("jwtToken")) {
      this.apiService.get("/auth")
        .subscribe(data => {
          this.setAuth(data)
        }, err => {
          this.eraseAuth()
        });
    } else {
      return this.eraseAuth();
    }
  }

  protected setAuth(user: User): void {
    this.jwtService.setToken("jwtToken", user.token);

    this.currentUserSubject.next(user);
    this.isAuthenicatedSubject.next(true);
  }

  protected eraseAuth() {
    if (this.jwtService.getToken("jwtToken")) {
      this.jwtService.removeToken("jwtToken");
    }

    this.currentUserSubject.next({} as User);

    this.isAuthenicatedSubject.next(false);
  }

  public attemptAuth(type: string, credentials: Object = {}): Observable<User> {
    const route = type === "login" ? "/login" : "";

    return this.apiService.post("/users" + route, {
      user: credentials
    }).pipe(
      map(data => {
        this.setAuth(data.user);
        return data;
      })
    )
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}