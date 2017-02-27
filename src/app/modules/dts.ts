/* tslint:disable:no-bitwise  */

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()

export class DTS {

    constructor(
        private titleService: Title,
    ) {

    }

    public setTitle(title: string): void {
        this.titleService.setTitle(title);
    }

    public getDate(dt: string): any {
        const dat: any = new Date(parseInt(dt, 0));
        return dat;
    }

    public newid(): string {
        return ('00000' + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5).toUpperCase();
    }

    public guid(): any { // return new Date().toISOString();
        function _p8(s: boolean): string {
            const p: string = (Math.random().toString(16) + '000000000').substr(2, 8);
            return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
        }
        const t: string = _p8(false) + _p8(true) + _p8(true) + _p8(false);
        return t.toLowerCase();
    }

    public getCookie(name: string): string {
        const nameEQ: string = name + '=';
        const ca: any[] = document.cookie.split(';');
        for (let i: number = 0; i < ca.length; i++) {
            let c: string = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                const co: string = c.substring(nameEQ.length, c.length);
                if (co === undefined || co === 'undefined') {
                    return null;
                }
                return co;
            }
        }
        return null;
    }

    public flattenObject(ob: any): any {
        const toReturn: any = {};

        for (const i in ob) {
            if (!ob.hasOwnProperty(i)) {
                continue;
            }

            if ((typeof ob[i]) === 'object') {
                const flatObject: any = this.flattenObject(ob[i]);
                for (const x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) {
                        continue;
                    }
                    toReturn[x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }
}
