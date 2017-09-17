'use strict';

import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { LocalStorage } from './local.storage';

import { DTS } from './dts';
import { Env } from './env';

@Injectable() /* This is #1 */

export class LoginService {

    constructor(
        private jwtHelper: JwtHelper,
        private localStorage: LocalStorage,
        private dts: DTS,
        private env: Env,
    ) {
        this.jwtHelper = new JwtHelper();
    }

    public setUser(): void {
        let valid: boolean = false;

        let cookie: string = this.dts.getCookie('io-user');

        if (!cookie) {
            console.log('$login (setUser) => no cookie');
            const LS_User: any = this.localStorage.get('io-token');
            if (LS_User) {
                valid = true;
                cookie = LS_User;
            }
        } else {
            console.log('$login (setUser) => cookie');
            valid = true;
            // tbdone guythis.$localStorage.user = cookie;
        }

        if (valid) {

            if (this.jwtHelper.isTokenExpired(cookie)) {
                return this.env.revokeUser();
            }
            console.log('$login (setUser token) => we have a token');
            console.log('$login (setUser token) => token expires ' + this.jwtHelper.getTokenExpirationDate(cookie));

            const tokendec: any = this.jwtHelper.decodeToken(cookie);
            const roles: any = tokendec.access || {};
            let allowed = false;

            console.log('$login (setUser roles) => ' + JSON.stringify(roles));

            if (roles.author || roles.admin || roles.reader) {
                allowed = true;
                roles.admin = true;
            }

            this.env.setUser({
                allowed: allowed,
                email: tokendec.email,
                loggedIn: true,
                roles: roles,
                token: cookie,
            });
        } else {
            this.env.revokeUser();
        }
    }

}