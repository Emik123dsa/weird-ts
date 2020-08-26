import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
    public constructor() {}

    public getToken(args: string): string {
        return window?.localStorage?.getItem(args);
    }

    public setToken(args: string, value: string | any): void {
        window.localStorage.setItem(args, value);
    }

    public removeToken(args: string): void {
        window.localStorage.removeItem(args);
    }
}
