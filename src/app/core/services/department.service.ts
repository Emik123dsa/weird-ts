import { Injectable } from "@angular/core";
import { ApiService, JwtService } from "./index";
import { HttpParams } from "@angular/common/http";
import {
  Department,
  DepartmentAccurate,
} from "../models";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
    private readonly httpParams: HttpParams = new HttpParams()
  ) { }

  public query(config: Department) { }

  public getAll(): Observable<Department[]> {
    return this.apiService.get("/departments").pipe(map((data) => data));
  }

  public get<T>(credentials: T): Observable<Department> {
    return this.apiService
      .get(`/currentDepartment/${credentials}`)
      .pipe(map((data) => data));
  }

  public save(credentials: Department): Observable<DepartmentAccurate> {
    return this.apiService
      .post(`/createDepartment/`, { department: credentials })
      .pipe(map((data) => data));
  }

  public update(
    currentId: number,
    credentials: Department
  ): Observable<DepartmentAccurate> {
    return this.apiService
      .post(`/updateDepartment/${currentId}`, { department: credentials })
      .pipe(map((data) => data));
  }

  public delete(currentId: number): Observable<DepartmentAccurate> {
    return this.apiService.delete(`/deleteDepartment/${currentId}`);
  }
}
