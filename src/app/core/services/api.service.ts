import {
  HttpEvent,
  HttpHandler,
  HttpEventType,
  HttpHeaders,
  HttpClient,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { JwtService } from "./jwt.service";
import { catchError } from "rxjs/operators";
@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}
  protected formatErrors<T>(error: T): Observable<any> {
    return throwError(error);
  }

  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http.get(path, { params }).pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatErrors));
  }
}
