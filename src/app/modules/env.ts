'use strict';

import { Injectable } from '@angular/core';

export interface IUser {
    email: string;
    name: string;
    token: string;
    loggedIn: boolean;
    allowed: boolean;
    roles: any;
}

@Injectable()

export class Env {

    public user: IUser;
    private config: any;

    constructor() {
        this.config = {
            bodyClass: [''],
        };
        this.user = {
            allowed: false,
            email: undefined,
            loggedIn: false,
            name: undefined,
            roles: [],
            token: undefined,
        };
    }

    public getField(field: any): any {
        return this.config[field];
    }

    public setField(field: string, value: any): void {
        this.config[field].push(value);
    }

    public removeField(field: string, value: any): void {
        let idx: number = this.config[field].indexOf(value);
        this.config[field].splice(idx, 1);
    }

    public setUser(obj: any): void {
        for (let prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            // console.info(prop + ' = ' + obj[prop]);
            this.user[prop] = obj[prop];
        }
        console.info('$env (setUser show email) => ', this.user.email);
    }

    public getUser(): any {
        return this.user;
    }

    public revokeUser(): void {
        this.user = {
            allowed: false,
            email: null,
            loggedIn: false,
            name: null,
            roles: {},
            token: null,
        };
    }
}