'use strict';

import { Component } from '@angular/core';

@Component({
    selector: 'site-masthead',
    templateUrl: 'templates/site.masthead.html',
})
export class SiteMastheadComponent {

    public body: any;

    constructor() {}

    public openMobileMenu(): void {}

}