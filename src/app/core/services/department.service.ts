import { Injectable } from "@angular/core";
import { ApiService, JwtService } from "./index";
import { HttpParams } from "@angular/common/http";
import {
  Department,
  DepartmentAccurate,
} from "../models";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable()
export class DepartmentService {
  constructor(
    private apiService: ApiService,
  ) { }

  protected propertiesObject(query: Object | Array<Object>): Object | Array<Object> {

    if (Array.isArray(query)) return query[Symbol.iterator]();

    let index = 0;

    let propKeys = Reflect.ownKeys(query);

    return {
      [Symbol.iterator](): Object | Array<Object> {
        return this
      },
      next(): Object | Array<Object> {
        if (index < propKeys.length) {
          let key = propKeys[index];
          index++;
          return { value: [key, query[key]] };
        } else {
          return { done: true };
        }
      }
    }
  }

  public query(config: Department) {

    let params: { [key: number]: string } = {};

    Object.keys(config)
      .map((key, value) => {
        params[key] = value;
      })

    return this.apiService.get("/searchDepartment", new HttpParams({ fromObject: params }))
  }

  public getAll(): Observable<Department[]> {
    return this.apiService.get("/departments").pipe(map((data) => data));
  }

  public get<T>(credentials?: T): Observable<Department> {
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
