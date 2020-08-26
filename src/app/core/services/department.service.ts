import { Injectable } from '@angular/core';
import { ApiService, JwtService } from './index';
import { HttpParams } from '@angular/common/http';

import { Department, DepartmentQueryModel } from '../models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class DepartmentService {
    constructor(private apiService: ApiService) {}
    public query(config: Readonly<DepartmentQueryModel>): Observable<any> {
        return this.apiService.get(
            '/searchDepartment',
            new HttpParams({
                fromObject: config as {
                    [param: string]: string | readonly string[];
                },
            }),
        );
    }

    public getAll(): Observable<Department[]> {
        return this.apiService.get('/departments').pipe(map((data) => data));
    }

    public get<T>(credentials?: Readonly<T>): Observable<Department> {
        return this.apiService
            .get(`/currentDepartment/${credentials}`)
            .pipe(map((data) => data));
    }

    public save(credentials: Readonly<Department>): Observable<Object[]> {
        return this.apiService
            .post(`/createDepartment/`, { department: credentials })
            .pipe(map((data) => data));
    }

    public update(
        currentId: number,
        credentials: Department,
    ): Observable<Object[]> {
        return this.apiService
            .post(`/updateDepartment/${currentId}`, { department: credentials })
            .pipe(map((data) => data));
    }

    public delete(currentId: Readonly<number>): Observable<Object[]> {
        return this.apiService.delete(`/deleteDepartment/${currentId}`);
    }
}
