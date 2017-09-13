'use strict';

import { Component } from '@angular/core';
@Component({
    selector:    'site-header',
    templateUrl: 'templates/site.header.html',
})

export class SiteHeaderComponent {
    public user: string;

    ngOnInit(): any {
    }
}
