'use strict';

import { Component } from '@angular/core';
import {MenubarModule, MenuItem} from 'primeng/primeng';
@Component({
    selector:    'site-header',
    templateUrl: 'templates/site.header.html',
})

export class SiteHeaderComponent {
    private items: MenuItem[];
    public user: string;

    ngOnInit(): any {
        this.items = [
            {
                label: 'User', icon: 'fa-user',
                items: [
                    {
                    label: 'Login',
                    url: '/login',
                },
                    {label: 'Logout', url: '/logout'},
                ],
            },
        ];
    }
}
