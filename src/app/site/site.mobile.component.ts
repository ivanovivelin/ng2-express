'use strict';


import { Component } from '@angular/core';
import { Env } from 'io-ng2-util/common/env';

@Component({
    selector: 'site-mobile',
    template: './templates/site.mobile.html',
})

export class SiteMobileComponent {

    constructor(public env: Env) {
    }

    closeMobileMenu(): any {}

}
